<template>
    <div class="wrapper">
        <div class="generic__wrapper">
            <div class="generic__type1">Раунд</div>
            <div class="generic__type2">Тестовый раунд</div>
            <div class="desk">
                <div class="generic">Тип раунда:</div>
                <div class="generic__subtype">Пробный раунд — вне зачет</div>
            </div>
        </div>
        <div class="features">
            <ul class="feature__grid">
                <li class="feature__item">
                    <h3>&laquo;Убрать неверный ответ&raquo;</h3>
                    <div class="number">1</div>
                </li>
                <li class="feature__item">
                    <h3>&laquo;Ставлю на...&raquo;</h3>
                    <div class="number">1</div>
                </li>
                <li class="feature__item">
                    <h3>&laquo;Один за всех&raquo;</h3>
                    <div class="number">1</div>
                </li>
                <li class="feature__item">
                    <h3>&laquo;Ва-банк&raquo;</h3>
                    <div class="number">1</div>
                </li>
                <li class="feature__item">
                    <h3>&laquo;Баллы на бочку&raquo;</h3>
                    <div class="number">1</div>
                </li>
                <li class="feature__item">
                    <h3>&laquo;Время на ответ&raquo;</h3>
                    <div class="number">1</div>
                </li>
            </ul>
        </div>
        <QuestionCard
            v-for="(item, key) in currentRound.questions"
            :key="key"
            :title="item.question"
            :answers="item.answers ?? []"
            :correct="item.correct_answer ?? ''"
        />
    </div>
</template>

<script setup lang="ts">
import QuestionCard from '@/components/question/QuestionCardComponent.vue'
import { useGameStore } from '@/stores/game'
import type { IRound } from '@/stores/game'
import { onMounted, computed } from 'vue'
const store = useGameStore()

// const date = computed(() => {
//     return store.currentGame.game_info.date ?? '01.01.2024';
// });
const props = defineProps<{
    currentRound: IRound
}>()
//alert(JSON.stringify(props.currentRound));
console.log(props.currentRound)
const qmock = [
    {
        title: 'Вопрос на миллион',
        answers: ['Первый', 'Второй', 'Третий', 'Четвертый'],
        correct: 2
    },
    {
        title: 'Вопрос на миллион',
        answers: ['Первый', 'Второй', 'Третий', 'Четвертый'],
        correct: 2
    },
    {
        title: 'Вопрос на миллион',
        answers: ['Первый', 'Второй', 'Третий', 'Четвертый'],
        correct: 2
    },
    {
        title: 'Вопрос на миллион',
        answers: ['Первый', 'Второй', 'Третий', 'Четвертый'],
        correct: 2
    }
]
</script>

<style scoped>
.generic__wrapper {
    text-align: center;
    margin: 0 auto;
    width: 100%;
    color: var(--text-darker);
}
.generic__type1 {
    font-size: 1.2em;
    padding: 0.5em;
}
.generic__type2 {
    font-size: 1.5em;
    font-weight: 700;
    color: var(--main);
}
.desk .generic {
    font-weight: 700;
}
.wrapper {
    display: block;
    background-color: var(--background);
}
.feature__grid {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 1em auto;
}
.feature__item {
    text-align: center;
    padding: 1em;
}
.feature__item h3 {
    font-weight: 700;
    color: var(--text-darker);
}
.feature__item .number {
    color: black;
    font-weight: 700;
}
</style>
