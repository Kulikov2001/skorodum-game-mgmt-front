<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import {config} from "@/config";
import {useGameStore} from "@/stores/game";


const store = useGameStore();
const emit = defineEmits<{
    (e: 'reloadrequired'): void
}>();
// function returnFileSize(number) {
//     if (number < 1024) {
//         return `${number} байт>`;
//     } else if (number >= 1024 && number < 1048576) {
//         return `${(number / 1024).toFixed(1)} кБ`;
//     } else if (number >= 1048576) {
//         return `${(number / 1048576).toFixed(1)} мБ`;
//     }
// }

const jsonData = ref<any>(null); // Use 'any' type for flexibility

const submitFile = async () => {
    try {
        const response = await axios.post(config.urls.create.game, jsonData.value, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('SUCCESS!!', response);
        emit('reloadrequired')
        store.globalNotification.type = "success"
        store.globalNotification.isFixed = false;
        store.globalNotification.message = "Игра успешно импортирована"
        setTimeout(store.globalNotification.clear, 5000);
    } catch (error) {
        console.error('FAILURE!!', error);
        store.globalNotification.type = "error"
        store.globalNotification.isFixed = false;
        store.globalNotification.message = "Ошибка при импорте игры. Убедитесь в валидности файла"
        setTimeout(store.globalNotification.clear, 5000);
    }
};

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                jsonData.value = JSON.parse(reader.result);
            } else {
                alert(typeof(reader.result));
            }
        };
        reader.readAsText(file);
    }
    //submitFile();
};
</script>

<template>
    <div class="upload__wrapper">
        <label for="game_upload">Импортировать сценарий игры:</label>
        <input
            type="file"
            id="game_upload"
            name="game_upload"
            accept=".json"
            ref="fileInput"
            @change="handleFileUpload"
        />
        <button @click="submitFile">Импортировать</button>
    </div>
</template>

<style scoped>
.upload__wrapper{
    padding: 1em;
    background: var(--bg-darker);
    border-radius: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1em auto;
}
.upload__wrapper > button, ::file-selector-button{
    background: var(--main);
    color: white;
    border: 0;
    border-radius: 1em;
    padding: 1em 2em;
}
input > span {
    display: none;
}
label{
    flex-grow: 3;
    flex-shrink: 1;
}
input{
    flex-grow: 1;
    flex-shrink: 3;
}
</style>