<template>
    <h2 class="title">Раунды</h2>
    <div class="roundsList__wrapper">
        <div class="round__item" v-for="(round, index) in rounds" :key="index">
            <div class="round__item-left">
                <span class="round__item-name"  > {{ round.settings.name }} </span> |
                <span class="round__item-secondary">Meta info</span>
            </div>
            <div class="round__item-right">
                <EditableIco @click="handleRoundClick(round)" width="20" />
                <DeleteBtn style="margin-left: 1em;" width="20" @click="store.removeRoundAtIndex(index)" />
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
.round__item{
    padding: 1em;
    border-bottom: 1px solid var(--text-darker);
}
.round__item-name{
    font-weight: 500;
    color: black;
}
.roundList__btn{

}
.roundsList__wrapper {
    padding: 2em;
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
.round__item:last-child{
    margin-bottom: 2em;
}
.round__item-right {
    float: right;
    opacity: .5;
    cursor: pointer;
}
</style>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useGameStore } from '@/stores/game'
import type { IRound } from '@/stores/game'
import EditableIco from '@/assets/EditableIco.vue'
import DeleteBtn from '@/assets/DeleteBtn.vue'
import {useRouter} from "vue-router";
const store = useGameStore()
const rounds = ref<IRound[]>([])
const router = useRouter();
const handleRoundClick = async(round: IRound) => {
    store.editRound(round).then(()=>router.push('/new/round'));
}
onMounted(() => {
    rounds.value = store.currentGame.rounds ?? []
})
watch(rounds, (newVal) => {
    store.currentGame.rounds = newVal
})
</script>
