<template>
    <div>
        <NotificationComponent v-model="store.globalNotification" />
        <TitleBarComponent :title="'Новый вопрос'" :back="['Вернуться к банку вопросов', '/bank']" />
        <CreateQuestionComponent :class="{ active: activeAccordionElem.includes('Создать') }" />

        <ButtonsBarComponent
                @save="handleSave"
                @reset="handleReset"
                :save="true"
                :reset="true"
                :to-all="true"
        />
    </div>
</template>
<script setup lang="ts">
import ButtonsBarComponent from '@/components/base/ButtonsBarComponent.vue'
import TitleBarComponent from '@/components/base/TitleBarComponent.vue'
import CreateQuestionComponent from '@/components/newRound/CreateQuestionComponent.vue'
import { onMounted, ref } from 'vue'
import { useGameStore} from '@/stores/game'
import type {IRound} from '@/stores/game'
import NotificationComponent from '@/components/base/NotificationComponent.vue'

const store = useGameStore()
const activeAccordionElem = ref<string[]>(['Создать', 'Банк'])
const toggleAccordion = (val: string) => {
    if (activeAccordionElem.value.includes(val)) {
        activeAccordionElem.value = activeAccordionElem.value.filter((item) => item != val)
    } else {
        activeAccordionElem.value.push(val)
    }
}

const handleSave = () => {
    try {
        store.currentGame.rounds = store.currentGame.rounds ?? []
        const duplicate: number = store.currentGame.rounds.findIndex(round => round.settings.name === store.currentRound.settings.name)
        if (duplicate !== -1) {
            store.currentGame.rounds[duplicate] = store.currentRound
        } else {
            store.currentGame.rounds.push(store.currentRound)
        }

        store.globalNotification.message = 'Раунд добавлен в игру'
        store.globalNotification.type = 'success'
    } catch (e) {
        store.globalNotification.message = 'Ошибка при добавлении в раунд'
        store.globalNotification.type = 'error'
    } finally {
        store.globalNotification.isFixed = true
        setTimeout(store.globalNotification.clear, 1500)
    }
}
const handleReset = () => {
    store.clearRound()
    store.clearQuestion()
}
</script>
<style scoped>
.bigelem {
    margin: 1em auto;
}
.bigelem .accord {
    background-color: white;
}
</style>
