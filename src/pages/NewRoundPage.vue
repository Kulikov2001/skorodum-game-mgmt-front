<template>
    <div>
        <TitleBarComponent :title="'Новый раунд'" :back="['Вернуться к игре', '/new']" />
        <NewRoundFormComponent />
        <AccordionItem
            :isOpen="true"
            @titleClick="toggleAccordion"
            :title="'Создать вопрос'"
        >
            <CreateQuestionComponent :class="{ active: showCreateQuestion }" />
        </AccordionItem>
        <RoundQuestionComponent />
        <ButtonsBarComponent :save="true" :reset="true" :to-all="true" />
    </div>
</template>
<script setup lang="ts">
import ButtonsBarComponent from '@/components/base/ButtonsBarComponent.vue'
import TitleBarComponent from '@/components/base/TitleBarComponent.vue'
import NewRoundFormComponent from '@/components/newRound/NewRoundFormComponent.vue'
import CreateQuestionComponent from '@/components/newRound/CreateQuestionComponent.vue'
import AccordionItem from '@/components/Accordion/AccordionComponent.vue'
import { ref } from 'vue'
import RoundQuestionComponent from '@/components/newRound/RoundQuestionComponent.vue'
const showCreateQuestion = ref(true)
const toggleAccordion = () => {
    showCreateQuestion.value = !showCreateQuestion.value
}
</script>
<style scoped></style>
