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
import { ref } from 'vue'
const store = useGameStore()

const roundQuestions = ref<any>(store.currentRound.questions)
const mockquestionround = [
    {
        question: 'Как называется наш проект?',
        answers: [
            'При помощи весов на станелях заводов',
            'При помощи лазера',
            'Рассчитывают по ряду Фурье',
            'При строительстве масонских лож'
        ],
        correct_answer: 'При помощи лазера'
    },
    {
        question: 'Как называется наш проект?',
        answers: [
            'При помощи весов на станелях заводов',
            'При помощи лазера',
            'Рассчитывают по ряду Фурье',
            'При строительстве масонских лож'
        ],
        correct_answer: 'При помощи лазера'
    }
]
</script>

<style scoped>
h3 {
    text-align: center;
    font-weight: 700;
}
</style>
