<template>
    <div class="name__wrapper">
    <h1>{{ title }}</h1>
    <h4>| {{ date }}</h4>
    </div>
    <RoundComponent v-for="(item, key) in rounds" :key="key" :current-round="item" />
    <div class="btns">
        <button-component @click="handleSaveGame" class="green currGamebtn">Сохранить игру</button-component>
        <button-component class="currGamebtn" @click="handleDownloadGame" style="float: right;"><span style="vertical-align: middle;display: inline-flex; flex-direction: row; align-items: center; gap: .5em;">Скачать <download-btn /></span></button-component>
        <button-component class="currGamebtn" @click="handleShareGame" style="float: right;">Поделиться</button-component>
    </div>
</template>

<script setup lang="ts">
import RoundComponent from '@/components/round/RoundComponent.vue'
import { useGameStore } from '@/stores/game'
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ButtonComponent from "@/components/base/ButtonComponent.vue";
import DownloadBtn from "@/assets/DownloadBtn.vue";
const router = useRouter()
const store = useGameStore()
const title = computed(() => {
    return store.currentGame.game_info.name ?? 'Без названия'
})
const date = computed(() => {
    return store.currentGame.game_info.date ?? '01.01.2024'
})
const rounds = computed(() => {
    return store.currentGame.rounds ?? []
})
const handleSaveGame = () => {

}
const handleDownloadGame = () => {

}
const handleShareGame = async() => {
    const shareData = {
        title: `${store.currentGame.game_info.name}`,
        text: "Посмотри мой сценарий скородум!",
        url: `${window.location.href}`,
    };
    try {
        await navigator.share(shareData);
    } catch (e) {
        console.error(e);
    }
}
onMounted(() => {
    store.clearGame()
    let _id = router.currentRoute.value.params.id
    switch (typeof _id) {
        case 'string':
            break
        case 'object':
            _id = _id[0]
            break
    }
    let parsedId = parseInt(_id)
    if (typeof parsedId === 'number') {
        store.getGame(parsedId)
    }
})
onUnmounted(() => {
    store.clearGame()
})
</script>

<style scoped>
.name__wrapper{
    text-align: center;
    width: 100%;
    margin: 1em auto;
}
.name__wrapper h1{
    font-weight: 600;
}
.btns{
    @media screen and (max-width: 750px){
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
    .currGamebtn{
        margin-top: 1em;
    }
}
</style>
