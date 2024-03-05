<template>
<h1>{{ title }}</h1>
<h4>| {{date}}</h4>
<RoundComponent 
    v-for="(item,key) in rounds"
    :key="key"
    :current-round="item"
/>
</template>

<script setup lang="ts">
import RoundComponent from '@/components/round/RoundComponent.vue'
import { useGameStore } from '@/stores/game';
import { computed, onMounted } from 'vue';
import {useRouter} from 'vue-router';
const router = useRouter();
const store = useGameStore();
const title = computed(() => {
    return store.currentGame.game_info.name ?? 'Без названия';
});
const date = computed(() => {
    return store.currentGame.game_info.date ?? '01.01.2024';
});
const rounds = computed(() => {
    return store.currentGame.rounds ?? [];
});
onMounted(()=>{
    let parsedId = parseInt(router.currentRoute.value.params.id);
    if (typeof parsedId === 'number'){
        store.getGame(parsedId);
    }
});
    
</script>

<style scoped>

</style>