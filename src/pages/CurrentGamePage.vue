<template>
    <h1>{{ title }}</h1>
    <h4>| {{ date }}</h4>
    <RoundComponent v-for="(item, key) in rounds" :key="key" :current-round="item" />
</template>

<script setup lang="ts">
import RoundComponent from '@/components/round/RoundComponent.vue'
import { useGameStore } from '@/stores/game'
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
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

<style scoped></style>
