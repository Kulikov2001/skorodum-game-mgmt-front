const tar = require('tar');
const path = require('path');
const {NodeSSH} = require('node-ssh');
const dotenv = require('dotenv');
const fs = require('fs').promises;

dotenv.config();

const today = new Date();

const buildNumber = today.getFullYear().toString() + today.getMonth().toString() + today.getDate().toString() + '-' + today.getHours().toString() + today.getMinutes().toString();//process.env.BUILD_NUMBER;
const remoteHost = process.env.HOST;
const remoteUsername = process.env.SSH_USERNAME;
const remotePassword = process.env.SSH_PASSWORD;
const remotePath = process.env.RC_ROOT;

// Шаг 1: Пакуем архив в tar.gz и загружаем на удаленный сервер
function packAndUpload(buildNumber, remoteHost, remoteUsername, remotePassword, remotePath) {
	console.log(buildNumber);
	console.log(remoteHost);
	console.log(remoteUsername);
	console.log('**********');
	console.log(remotePath);

	const ssh = new NodeSSH();

	return ssh.connect({
		host: remoteHost,
		username: remoteUsername,
		password: remotePassword,
	})
		.then(() => {
			// Создание временной папки на удаленном сервере
			const tempFolderPath = `tmp/build_${buildNumber}`; // Путь к временной папке на удаленном сервере

			console.log(`Временная папка ${tempFolderPath} создана`);
			ssh.execCommand(`rm -r ${remotePath}last`);
			return ssh.execCommand(`mkdir -p "${remotePath}${tempFolderPath}"`)
				.then(() => {
					const sourceDirectory = 'dist';
					const targetTarball = `build_${buildNumber}.tar.gz`;
					const filePath = path.join(process.cwd(), sourceDirectory);

					return tar.create(
						{ gzip: true, file: targetTarball, cwd: filePath },
						['./'] // Используем относительный путь для добавления всех файлов и папок из текущей рабочей директории
					)
						.then(() => {
							console.log(`Шаг 1: Упаковка в tar.gz - выполнена успешно: build_${buildNumber}.tar.gz`);

							// Загрузка архива на удаленный сервер
							return ssh.putFile(`build_${buildNumber}.tar.gz`, `${remotePath}${tempFolderPath}/build_${buildNumber}.tar.gz`)
								.then(() => {
									console.log('Шаг 1.2: Загрузка архива на удаленный сервер - выполнена успешно');

									// Распаковка архива на удаленном сервере
									return ssh.execCommand(`cd ${remotePath}${tempFolderPath} && tar -xf build_${buildNumber}.tar.gz`)
										.then(() => {
											console.log('Шаг 1.3: Распаковка архива на удаленном сервере - выполнена успешно');

											return ssh.dispose();
										});
								});
						});
				});
		})
		.then(() => {
			return replaceOldBuild(buildNumber, remoteHost, remoteUsername, remotePassword, remotePath);
		})
		.catch((error) => {
			ssh.dispose();
			console.error('Ошибка в шаге 1: Упаковка и загрузка архива на удаленный сервер', error);
			console.log('----- Деплой завершен неудачно -----');
			process.exit(1);
		});
}

// Шаг 2: Замена старого билда новым и удаление артефактов
function replaceOldBuild(buildNumber, remoteHost, remoteUsername, remotePassword, remotePath) {
	const tempFolderPath = `tmp/build_${buildNumber}`; // Путь к новому билду на удаленном сервере

	return new Promise((resolve, reject) => {
		const ssh = new NodeSSH();

		return ssh.connect({
			host: remoteHost,
			username: remoteUsername,
			password: remotePassword,
		})
			.then(() => {
				console.log('SSH подключение установлено');

				// Перемещение нового билда из временной папки
				const newBuildPath = `${remotePath}${tempFolderPath}`; // Путь к новому билду на удаленном сервере
				return ssh.execCommand(`mv -f "${newBuildPath}" "${remotePath}last/"`)
					.then(() => {
						ssh.execCommand(`cd ${remotePath}last/build_${buildNumber}/ && mv -i -f ./* ../`);
					})
					.then(() => {
						console.log(`Временный билд перемещен в ${remotePath}last`);
						// Удаление артефактов (ненужных файлов)
						return ssh.execCommand(`rm -r "${remotePath}tmp"`)
							.then(() => {
								return ssh.execCommand(`rm "${remotePath}last/build_${buildNumber}.tar.gz"`);
							})
							.then(() => {
								return ssh.execCommand(`cd ../ && rm -r ${remotePath}last/build_${buildNumber}`);
							})
							.then(() => {
								deleteTar(`build_${buildNumber}.tar.gz`);
								console.log('Артефакты удалены');
								console.log('+++++ Деплой успешно завершен +++++');
								process.exit(0);
							});
					});
			})
			.catch((e) => {
				reject(e);
			})
			.finally(() => {
				ssh.dispose();
			});
	})
		.catch((e) => {
			console.error('Ошибка в шаге 2: Замена старого билда новым', e);
			deleteTar(`build_${buildNumber}.tar.gz`);
			console.log('----- Деплой завершен неудачно -----');
			process.exit(1);
		});
}

function deleteTar(tarFile) {
	return fs.unlink(tarFile)
		.then(() => {
			console.log('Файл успешно удален:', tarFile);
		})
		.catch((err) => {
			console.error('Ошибка при удалении файла:', err);
			console.log('----- Деплой завершен неудачно -----');
			process.exit(1);
		});
}

packAndUpload(buildNumber, remoteHost, remoteUsername, remotePassword, remotePath);
