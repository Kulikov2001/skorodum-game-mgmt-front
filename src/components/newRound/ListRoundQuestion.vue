<template>
    <div class="wrapper">
        <h3>Вопросы раунда</h3>
        <QuestionCard
            :key="i"
            v-for="(question, i) in roundQuestions"
            :title="question.question"
            :answers="question.answers!"
            :correct="question.correct_answer!"
        />
    </div>
</template>

<script setup lang="ts">
import QuestionCard from '@/components/question/QuestionCardComponent.vue'
import { useGameStore } from '@/stores/game'
import type { IQuestion } from '@/stores/game'
import { ref,watch } from 'vue'
const store = useGameStore()

const roundQuestions = ref<IQuestion[]>(store.currentRound.questions ?? [])
watch(store.currentRound.questions ?? [], (updatedQuestions) => {
    roundQuestions.value = updatedQuestions
})
</script>

<style scoped>
h3 {
    text-align: center;
    font-weight: 700;
}
</style>
