<template>
    <div class="wrapper">
        <h3>Вопросы раунда</h3>
        <QuestionCard
            :key="i"
            v-for="(question, i) in mockquestionround"
            :title="question.title"
            :variations="question.variations"
            :correct="question.correct"
        />
    </div>
</template>

<script setup lang="ts">
import QuestionCard from '@/components/question/QuestionCardComponent.vue'
const mockquestionround = [
    {
        title: 'Как называется наш проект?',
        variations: [
            'При помощи весов на станелях заводов',
            'При помощи лазера',
            'Рассчитывают по ряду Фурье',
            'При строительстве масонских лож'
        ],
        correct: 4
    },
    {
        title: 'Как называется наш проект?',
        variations: [
            'При помощи весов на станелях заводов',
            'При помощи лазера',
            'Рассчитывают по ряду Фурье',
            'При строительстве масонских лож'
        ],
        correct: 4
    }
]
</script>

<style scoped>
h3 {
    text-align: center;
    font-weight: 700;
}
</style>
