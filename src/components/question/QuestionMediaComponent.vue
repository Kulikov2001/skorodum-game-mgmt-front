<template>
    <nav class="tab__wrapper">
        <div class="tab__item" :class="{ active: !photoTabOpened }" @click="toggleTab('default')">
            <h3>Вопрос</h3>
        </div>
        <div class="tab__item" :class="{ active: photoTabOpened }" @click="toggleTab('photo')">
            <h3>Фото вопрос</h3>
        </div>
    </nav>
    <div class="tab__content">
        <div class="tab__content-wrapper" v-if="!photoTabOpened">
            <div class="tab__content-item">
                <h3 align="center">Медиа до вопроса</h3>
                <FilePicker @uploaded="handleUploaded($data)" :role="{ position: 'before' }" />
                <p class="desc" align="center">
                    Выберите медиа файл для демонстрации перед вопросом
                </p>
            </div>
            <div class="tab__content-item">
                <h3 align="center" style="text-wrap: nowrap;">Медиа после вопроса</h3>
                <FilePicker @uploaded="handleUploaded($data)" :role="{ position: 'after' }" />
                <p class="desc" align="center">
                    Выберите медиа файл для демонстрации после вопроса
                </p>
            </div>
        </div>
        <div class="tab__content-wrapper" v-if="photoTabOpened">
            <div class="tab__content-item">
                <h3 align="center">Медиа до вопроса!!</h3>
                <FilePicker @uploaded="handleUploaded($data)" :role="{ position: 'before', type: 'photo' }" />
                <p class="desc" align="center">
                    Выберите медиа файл для демонстрации перед вопросом
                </p>
            </div>
            <div class="tab__content-item">
                <h3 align="center">Медиа после вопроса</h3>
                <FilePicker @uploaded="handleUploaded($data)" :role="{ position: 'after', type: 'photo' }" />
                <p class="desc" align="center">
                    Выберите медиа файл для демонстрации после вопроса
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import FilePicker from '@/components/base/FilePickerComponent.vue'
import {ref, watch} from 'vue'
import {useGameStore} from "@/stores/game";
const photoTabOpened = ref(false)
const toggleTab = async (val: string) => {
    val === 'photo' ? (photoTabOpened.value = true) : (photoTabOpened.value = false)
}
watch(photoTabOpened, () => {
    store.currentQuestion.media_data!.show_image = photoTabOpened.value;
})
const store = useGameStore();
const handleUploaded = (data: any)=>{
    store.setCurrQMedia(data);
    emit('uploaded', data)
}
const emit = defineEmits<{
    (e: 'uploaded', data: any): void
}>();
</script>

<style scoped>
.tab__wrapper {
    margin-top: 4em;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.tab__content-wrapper {
    z-index: 1;
    margin-top: -1em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: white;
}
@media screen and (max-width: 500px){
    .tab__content-wrapper {
        grid-template-columns: 1fr;
    }
}
.tab__content-item {
    background-color: white;
}
.desc {
    width: 70%;
    margin: 0 auto;
}
.tab__item {
    text-align: center;
    border-radius: 1.5em;
    color: var(--text-darker);
    padding: 0.5em 0.5em 2em 0.5em;
    transition: background-color 0.3s ease;
}
.tab__item h3 {
    font-weight: 700;
}
.tab__content-item h3 {
    padding: 1.5rem;
    color: var(--text-darker);
    font-weight: 400;
}
.tab__item:not(.active) {
    background-color: var(--bg-darker);
}
.tab__item.active {
    background-color: white;
}
</style>
