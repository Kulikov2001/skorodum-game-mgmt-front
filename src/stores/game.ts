import { ref } from 'vue'
import { defineStore } from 'pinia'
import {VIDEO_EXTENSION, PHOTO_EXTENSION} from '@/components/base/AllowedExtension'
import axios from 'axios'
import { config } from '@/config'
import type { INotification } from '@/components/base/NotificationComponent.vue'
import type { ICategory } from '@/components/question/CategoryFormComponent.vue'
function getToday(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}
export const CLEAN_MEDIA: IMedia = {
    id: -1,
    show_image: false,
    video: {
        before: '',
        after: '',
    },
    image: {
        before: '',
        after: '',
        player_displayed: false,
    }
}
export const CLEAN_GAME: IGame = {
    game_info: {
        name: '',
        theme: '',
        client: '',
        date: `${getToday()}`
    },
    game_settings: {
        tactics: {
            remove_answer: 0,
            one_for_all: 0,
            question_bet: 0,
            all_in: 0,
            team_bet: 0
        },
        skip_emails: false
    }
}
export const CLEAN_ROUND: IRound = {
    type: '',
    settings: {
        is_test: false,
        name: '',
        display_name: false,
        time_to_answer: 0,
        use_special_tactics: false
    }
}
export const CLEAN_QUESTION: IQuestion = {
    type: '',
    question: '',
    answers: [],
    correct_answer: '',
    time_to_answer: 0,
    media_data: {
        show_image: false,
        video: {
            before: '',
            after: ''
        },
        image: {
            before: '',
            after: '',
            player_displayed: false
        }
    },
    categories: []
}
interface IGame {
    isCommonFeatures?: boolean
    id?: number
    game_info: {
        name: string
        theme: string
        client: string
        date: string
    }
    game_settings: {
        tactics: {
            remove_answer: number
            one_for_all: number
            question_bet: number
            all_in: number
            team_bet: number
        }
        skip_emails: boolean
    }
    rounds?: IRound[]
}
export interface IQuestionSearchQuery {
    question_text?: string
    question_type?: string
    isPhoto?: boolean
}
export interface IRound {
    id?: number
    type: string
    settings: {
        is_test: boolean
        name: string
        display_name: boolean
        time_to_answer: number
        use_special_tactics: boolean
        remove_answer?: number
        one_for_all?: number
        question_bet?: number
        all_in?: number
        team_bet?: number
    }
    questions?: IQuestion[]
}
export interface IMedia {
    id?: number
    show_image: boolean
    video: {
        before: string
        after: string
    }
    image: {
        before: string
        after: string
        player_displayed: boolean
    }
}
/** TODO:
 * 1. Сделать мини-questions для get-question-names
 * 2. Выпилить any  */
export interface IQuestion {
    id?: number
    type?: string
    question: string
    answers?: string[]
    correct_answer?: string
    time_to_answer?: number
    media_data?: IMedia
    categories: ICategory[]
}
export interface BIGame {
    id: number
    name: string
    theme: string
    client: string
    date: string
    remove_answer: number
    one_for_all: number
    question_bet: number
    all_in: number
    team_bet: number
    skip_emails: boolean
    rounds: BIRound[]
}
export interface BIGameLite {
    id: number
    name: string
    theme: string
    date: string
}
export interface BIRound {
    id: number
    game_id: number
    round_type: string
    is_test: boolean
    name: string
    display_name: boolean
    time_to_answer: number
    use_special_tactics: boolean
    questions?: BIQuestion[] | any
}
export interface BIQuestion {
    id: number
    question_type: string
    question_text: string
    show_image: boolean
    image_before: string
    image_after: string
    video_before: string
    time_to_answer: number
    correct_answer: string
    answers: string
    player_display: boolean
    category: ICategory[]
}
export const useGameStore = defineStore('game', () => {
    const currentGame = ref<IGame>(CLEAN_GAME)
    const allGames = ref<IGame[]>()
    const allRoundsInCurrentGame = ref<IRound[]>()
    const currentRound = ref<IRound>(CLEAN_ROUND)
    const currentQuestion = ref<IQuestion>(CLEAN_QUESTION)
    const allQuestionsInCurrentRound = ref<IQuestion[]>([])
    const globalNotification = ref<INotification>({
        isFixed: false,
        type: '',
        message: '',
        clear: () => {
            globalNotification.value.message = ''
            globalNotification.value.type = ''
            globalNotification.value.isFixed = false
        }
    })
    /*
    * {
    headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers, Content-Type, Authorization, Content-Type',
            'Access-Control-Allow-Methods': '*',
            "Content-Type": "application/json"
        // Could work and fix the previous problem, but not in all APIs
        }}
    * **/
    const getGamesNames = async () => {
        axios
            .get(config.urls.get.all.games)
            .then(function (res) {
                if (res.status === 200 && res.data.length > 0) {
                    allGames.value = mapBILiteGameToIGame(res.data)
                    globalNotification.value.clear()
                } else {
                    return null
                }
            })
            .catch(function (error) {
                globalNotification.value.message = error.message
                globalNotification.value.type = 'error'
                setTimeout(() => getGamesNames(), 1500)
            })
    }
    const removeRoundAtIndex = async (index: number) => {
        currentGame.value.rounds!.splice(index, 1).concat(currentGame.value.rounds!.slice(-index));
    }
    const setCurrQMedia = async (file: any) => {
        (!currentQuestion.value.media_data) ? currentQuestion.value.media_data = CLEAN_MEDIA : null
        if (file.role.type === 'photo') {
            currentQuestion.value.media_data.show_image = true;
        }
        const name = decodeURI(file.file.split('/')[file.file.split('/').length - 1]);
        const extension = name.split('.')[name.split('.').length - 1];
        if ((VIDEO_EXTENSION.indexOf(extension) > -1) && file.role.position === 'before') {
            currentQuestion.value.media_data.video.before = file.file
        } else if ((VIDEO_EXTENSION.indexOf(extension) > -1) && file.role.position === 'after') {
            currentQuestion.value.media_data.video.after = file.file
        } else if ((PHOTO_EXTENSION.indexOf(extension) > -1) && file.role.position === 'before') {
            currentQuestion.value.media_data.image.before = file.file
        } else if ((PHOTO_EXTENSION.indexOf(extension) > -1) && file.role.position === 'after') {
            currentQuestion.value.media_data.image.after = file.file
        }
    }
    const propagandeMedia = async (filename: string, position: string, type: string, questionId?: number) => {
        const name = filename.split('/')[filename.split('/').length - 1];
        const extension = name.split('.')[name.split('.').length - 1];
        if (questionId) {
            axios.get(config.urls.get.question + questionId).then((res) => {
                if (res.status === 200) {
                    const payload: { [key: string]: any } = {
                        question_type: res.data.question_type,
                        question_text: res.data.question_text
                    };
                    if (extension === 'mp4' && position === 'before') {
                        payload.video_before = filename
                    } else if (extension === 'mp4' && position === 'after') {
                        payload.video_after = filename
                    } else if ((extension === 'jpg' || extension === 'png' || extension === 'jpeg' || extension === 'jpg') && position === 'after') {
                        payload.image_after = filename
                    } else if ((extension === 'jpg' || extension === 'png' || extension === 'jpeg' || extension === 'jpg') && position === 'before') {
                        payload.image_before = filename
                    }
                    axios.put(config.urls.update.question + res.data.id + '/', payload).then(function (res) {
                        if (res.status === 200) {
                            //TODO: Cоздат
                        }
                    });
                }
            });
        } else {
            if (!currentQuestion.value.media_data) {
                currentQuestion.value.media_data = CLEAN_MEDIA
            }
            if (extension === 'mp4' && position === 'before') {
                currentQuestion.value.media_data.video.before = filename
            } else if (extension === 'mp4' && position === 'after') {
                currentQuestion.value.media_data.video.after = filename
            } else if ((extension === 'jpg' || extension === 'png' || extension === 'jpeg' || extension === 'jpg') && position === 'after') {
                currentQuestion.value.media_data.image.after = filename
            } else if ((extension === 'jpg' || extension === 'png' || extension === 'jpeg' || extension === 'jpg') && position === 'before') {
                currentQuestion.value.media_data.image.before = filename
            }
        }
    }
    const getGame = async (_id: number) => {
        axios
            .get(config.urls.get.game + _id + '/')
            .then(function (res) {
                if (res.status === 200) {
                    currentGame.value = mapBIGameToIGame(res.data)
                } else {
                    return null
                }
            })
            .catch(function (error) {
                console.error(error.message);
                globalNotification.value.message = error.message
                globalNotification.value.type = 'error'
                //setTimeout(() => getGame(_id), 1500)
            })
    }


    const searchQuestions = async (queryParams: IQuestionSearchQuery): Promise<IQuestion[]> => {
        let isPhoto = '';
        const questionType = queryParams.question_type ?? '';
        const questionText = queryParams.question_text ?? '';
        if (queryParams.isPhoto) {
            isPhoto = queryParams.isPhoto.toString().substring(0, 1).toUpperCase() + queryParams.isPhoto.toString().substring(1);
        }
        const res = await axios.get(config.urls.search.question + '?query=' + encodeURI(questionText) + '&type=' + questionType + '&photo=' + isPhoto)
        if (res.status === 200) {
            try{
            const result: IQuestion[] = res.data.results.map((el: BIQuestion) => {
                return {
                    id: el.id,
                    type: el.question_type,
                    question: el.question_text,
                    answers: el.answers.split(','), // Changed separator to semicolon
                    correct_answer: el.correct_answer,
                    time_to_answer: el.time_to_answer,
                    media_data: {
                        show_image: el.show_image,
                        video: {
                            before: el.video_before,
                            after: '' // Set to empty string, backend to handle this
                        },
                        image: {
                            before: el.image_before,
                            after: el.image_after,
                            player_displayed: el.player_display
                        }
                    },
                    categories: el.category
                };
            });
            return result;
            } catch (e) {
                console.error(e);
                return []
            }
        } else {
            return []
        }
    }
    const createGame = async () => {
        const prepared = {
            game: {
                ...currentGame.value
            }
        }
        axios
            .post(config.urls.create.game, prepared)
            .then(function (res) {
                if (res.status === 200 || res.status === 201) {
                    globalNotification.value.message =
                        'Игра ' + prepared.game.game_info.name + ' успешно создана'
                    globalNotification.value.type = 'success'
                    return true
                } else {
                    return null
                }
            })
            .catch(function (error) {
                globalNotification.value.message = error.message
                globalNotification.value.type = 'error'
            })
    }
    const downloadGame = async (_id: number) => {
        axios
            .get(config.urls.get.game + _id + '/')
            .then(function (res) {
                if (res.status === 200 && res.data) {
                    //downloadJSON({game: {...res.data}})
                    downloadJSON({ game: {...mapBIGameToIGame(res.data) }});
                } else {
                    return null
                }
            })
            .catch(function (error) {
                globalNotification.value.message = error.message
                globalNotification.value.type = 'error'
            })
    }
    //TODO: Удалить downloadWordGame, т.к. заменено на a.download
    const downloadWordGame = async(_id: number)=>{
        axios.get(config.urls.download.word + _id + '/').then((res) => {

            const FILE = window.URL.createObjectURL(new Blob([res.data]));
            const docUrl = document.createElement('a');
            docUrl.href = FILE;
            docUrl.setAttribute('download', 'file.docx');
            document.body.appendChild(docUrl);
            docUrl.click();
        }).catch(function (error) {
            console.error(error.message);
        });
    }

    const deleteGame = async (_id: number) => {
        axios
            .delete(config.urls.delete.game + _id + '/')
            .then(function (res) {
                if (res.status < 300) {
                    globalNotification.value.message = 'Игра удалена'
                    globalNotification.value.type = 'success'
                }
            })
            .catch(function (error) {
                globalNotification.value.message = error.message
                globalNotification.value.type = 'error'
            })
    }
    const deleteRound = async (_id: number) => {
        axios
            .delete(config.urls.delete.round + _id + '/')
            .then(function (res) {
                if (res.status < 300) {
                    globalNotification.value.message = 'Раунд удален'
                    globalNotification.value.type = 'success'
                }
            })
            .catch(function (error) {
                globalNotification.value.message = error.message
                globalNotification.value.type = 'error'
            })
    }
    const setAnswersInsideQuestion = async (_answers: string[]) => {
        currentQuestion.value.answers = _answers
    }
    const setCorrectAnswer = async (_correct: string) => {
        currentQuestion.value.correct_answer = _correct
    }
    //TODO: в QCategories() => get: ()=>{}, set: ()=>{} отрефачить
    const setQuestionCategories = async (_categories: ICategory[]) => {
        currentQuestion.value.categories = _categories
    }
    const getQuestions = async (): Promise<IQuestion[]> => {
        try {
            const res = await axios.get(config.urls.get.all.questions);
            const result: IQuestion[] = res.data.map((el: BIQuestion) => {
                return {
                    id: el.id,
                    type: el.question_type,
                    question: el.question_text,
                    answers: el.answers.split(','), // Changed separator to semicolon
                    correct_answer: el.correct_answer,
                    time_to_answer: el.time_to_answer,
                    media_data: {
                        show_image: el.show_image,
                        video: {
                            before: el.video_before,
                            after: '' // Set to empty string, backend to handle this
                        },
                        image: {
                            before: el.image_before,
                            after: el.image_after,
                            player_displayed: el.player_display
                        }
                    },
                    categories: el.category
                };
            });
            //console.log(result)
            return result;
        } catch (e) {
            console.error(e);
            return [];
        }
    };
    const getQuestionCategories = (): ICategory[] => {
        return currentQuestion.value.categories
    }
    const addCategory = (clikedData: string, place: any) => {
        place.categories.push(clikedData)
    }
    const getCategories = async (): Promise<ICategory[]> => {
        try {
            const response = await axios.get(config.urls.get.all.categories);
            globalNotification.value.clear();
            const uniqueCategories: ICategory[] = [];
            response.data.forEach((item: ICategory) => {
                if (!uniqueCategories.some((category) => category.id === item.id)) {
                    uniqueCategories.push({
                        id: item.id,
                        name: item.name
                    });
                }
            });
            return uniqueCategories;
        } catch (error) {
            console.error(error);
            globalNotification.value.message = 'Ошибка. Подробности в консоли'
            globalNotification.value.type = 'error';
            setTimeout(getCategories, 2000);
            return []; // Return an empty array in case of error
        }
    };
    const editRound = async(round: IRound) => {
        currentRound.value = round;
    }


    const setCategories = async() => {
        currentQuestion.value.categories = await getCategories()
    }
    const clearGame = () => {
        currentGame.value = CLEAN_GAME
    }
    const clearRound = () => {
        currentRound.value = CLEAN_ROUND
    }
    const clearQuestion = () => {
        currentQuestion.value = CLEAN_QUESTION
    }
    const addCurrentQuestionToCurrentRound = () => {
        currentRound.value.questions
            ? currentRound.value.questions.push({ ...currentQuestion.value })
            : (currentRound.value.questions = [{ ...currentQuestion.value }])
        clearQuestion()
    }

    function downloadJSON(data: any) {
        const jsonse = JSON.stringify(data)
        const blob = new Blob([jsonse], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'scenario.json' //`${data.name + '.json' ?? 'game.json'}`
        a.textContent = `Download ${a.download}`
        a.click()
        a.remove()
    }
    function mapBILiteGameToIGame(data: BIGameLite[]): IGame[] {
        return data.map((item:any) => {
            return {
                id: item.id,
                game_info: {
                    name: item.name ?? '',
                    theme: item.theme ?? '',
                    client: '',
                    date: item.date
                },
                game_settings: {
                    tactics: {
                        remove_answer: 0,
                        one_for_all: 0,
                        question_bet: 0,
                        all_in: 0,
                        team_bet: 0
                    },
                    skip_emails: false
                }
            }
        })
    }
    function mapBIGameToIGame(data: BIGame): IGame {
        return {
            id: data.id ?? -1,
            game_info: {
                name: data.name ?? '',
                theme: data.theme ?? '',
                client: data.client ?? '',
                date: data.date ?? ''
            },
            game_settings: {
                tactics: {
                    remove_answer: data.remove_answer ?? 0,
                    one_for_all: data.one_for_all ?? 0,
                    question_bet: data.question_bet ?? 0,
                    all_in: data.all_in ?? 0,
                    team_bet: data.team_bet ??0
                },
                skip_emails: data.skip_emails ?? true
            },
            rounds: mapBIRoundToIRounds(data.rounds) ?? []
        }
    }
    function mapBIRoundToIRounds(data: BIRound[] | BIRound): IRound[] {
        const dataArray = Array.isArray(data)? data : [data]
            return dataArray.map((round) => ({
            id: round.id ?? -1,
            type: round.round_type ?? 'select',
            settings: {
                is_test: round.is_test ?? false,
                name: round.name ?? '',
                display_name: round.display_name?? '',
                time_to_answer: round.time_to_answer?? 0,
                use_special_tactics: round.use_special_tactics?? false,
            },
            questions: mapBIQuestionToIQuestions(round.questions)?? []
        }));

    }
    function mapBIQuestionToIQuestions(data: BIQuestion[]): IQuestion[] {
        const dataArray = Array.isArray(data)? data : [data]
        return dataArray.map((el) => ({
                id: el.id?? -1,
                type: el.question_type?? '',
                question: el.question_text?? '',
                answers: el.answers.split(',') ?? ['','','','']  /*TODO: Изменить сепоратор на ;*/,
                correct_answer: el.correct_answer?? '',
                time_to_answer: el.time_to_answer?? 0,
                media_data: {
                    show_image: el.show_image?? false,
                    video: {
                        before: el.video_before?? '',
                        after: '' /*TODO: Сделать на беке*/
                    },
                    image: {
                        before: el.image_before?? '',
                        after: el.image_after?? '',
                        player_displayed: el.player_display?? false,
                    }
                },
                categories: el.category?? []
        }));
    }
    return {
        currentGame,
        globalNotification,
        getQuestions,
        getGamesNames,
        downloadGame,
        deleteGame,
        deleteRound,
        getGame,
        setAnswersInsideQuestion,
        setCorrectAnswer,
        clearGame,
        clearRound,
        clearQuestion,
        createGame,
        getQuestionCategories,
        getCategories,
        setCategories,
        allGames,
        allRoundsInCurrentGame,
        editRound,
        downloadWordGame,
        currentRound,
        currentQuestion,
        allQuestionsInCurrentRound,
        mapBIQuestionToIQuestions,
        addCurrentQuestionToCurrentRound,
        removeRoundAtIndex,
        propagandeMedia,
        setCurrQMedia,
        searchQuestions,
    }
})
