<template>
    <h2 class="title">Раунды</h2>
    <div class="roundsList__wrapper">
        <div class="round__item" v-for="(round, index) in rounds" :key="index">
            <div class="round__item-left">
                <span class="round__item-name"> {{ round.settings.name }} </span> |
                <span class="round__item-secondary">Доделкин</span>
            </div>
            <div class="round__item-right">
                <EditableIco />
                <DeleteBtn />
            </div>
        </div>
        <button
            class="roundList__btn"
            @click="$router.push('/new/round')"
            v-if="true"
            color="var(--main)"
        >
            Добавить раунд
        </button>
        <!-- vs-button -->
    </div>
</template>
<style scoped>
.title {
    margin: 1em auto;
    text-align: center;
    font-weight: bold;
    color: var(--text-darker);
}
.roundsList__wrapper {
    border-radius: 2em;
    border: 1px solid var(--text-grey);
    background-color: var(--background);
    min-height: 8em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.round__item {
    display: block;
    width: 100%;
}
.round__item-left {
    float: left;
}
.round__item-right {
    float: right;
}
</style>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useGameStore } from '@/stores/game'
import type { IRound } from '@/stores/game'
import EditableIco from '@/assets/EditableIco.vue'
import DeleteBtn from '@/assets/DeleteBtn.vue'
const store = useGameStore()
const rounds = ref<IRound[]>([])
onMounted(() => {
    rounds.value = store.currentGame.rounds ?? []
})
watch(rounds, (newVal) => {
    store.currentGame.rounds = newVal
})
</script>
