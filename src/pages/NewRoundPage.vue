<template>
    <div>
        <NotificationComponent v-model="store.globalNotification" />
        <TitleBarComponent :title="'Новый раунд'" :back="['Вернуться к игре', '/new']" />
        <NewRoundFormComponent class="bigelem" />
        <!-- TODO: Вот эту порнографию в отдельный компонент + нормально логику настроить без быдлокодинга и индусятины-->
        <AccordionItem
            class="bigelem accord"
            :isOpen="activeAccordionElem.includes('Создать') ? true : false"
            @titleClick="toggleAccordion('Создать')"
            :title="'Создать вопрос'"
        >
            <CreateQuestionComponent :class="{ active: activeAccordionElem.includes('Создать') }" />
        </AccordionItem>
        <AccordionItem
            class="bigelem accord"
            :isOpen="activeAccordionElem.includes('Банк') ? true : false"
            @titleClick="toggleAccordion('Банк')"
            :title="'Добавить вопрос из банка'"
        >
            <BankQuestionComponent
                class="accordionEmbeded"
                :class="{ active: activeAccordionElem.includes('Банк') }"
            />
        </AccordionItem>
        <RoundQuestionComponent />
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
import NewRoundFormComponent from '@/components/newRound/NewRoundFormComponent.vue'
import CreateQuestionComponent from '@/components/newRound/CreateQuestionComponent.vue'
import AccordionItem from '@/components/Accordion/AccordionComponent.vue'
import { onMounted, ref } from 'vue'
import RoundQuestionComponent from '@/components/newRound/ListRoundQuestion.vue'
import BankQuestionComponent from '@/components/question/BankQuestionComponent.vue'
import { useGameStore } from '@/stores/game'
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
        store.currentGame.rounds.push(store.currentRound)
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
