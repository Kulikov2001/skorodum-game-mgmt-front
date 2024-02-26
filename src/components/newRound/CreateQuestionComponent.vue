<template>
    <div class="wrapper">
        <InputComponent placeholder="Напишите вопрос" v-model="questionName" />
        <QuestionMediaComponent />
        <div class="accordion__wrapper">
            <AccordionItem
                style="background-color: white"
                :title="'Открытый вопрос'"
                :is-open="false"
            >
            </AccordionItem>

            <AccordionItem
                style="background-color: white"
                :title="'Закрытый вопрос'"
                :is-open="true"
            >
                <ClosedQuestionComponent />
            </AccordionItem>
        </div>
    </div>
</template>
<script setup lang="ts">
import QuestionMediaComponent from '@/components/question/QuestionMediaComponent.vue'
import InputComponent from '@/components/base/InputComponent.vue'
import AccordionItem from '@/components/Accordion/AccordionComponent.vue'
import ClosedQuestionComponent from '@/components/question/ClosedQuestionComponent.vue'
import { ref } from 'vue'
const questionName = ref('')
</script>
<style scoped>
.wrapper {
    transition: max-height 2s ease;
    overflow: hidden;
}
.wrapper:not(.active) {
    max-height: 0;
}
.wrapper.active {
    max-height: none !important;
}
.accordion__wrapper :deep(h2) {
    color: var(--text-darker);
    font-size: 1.25em;
}
</style>
