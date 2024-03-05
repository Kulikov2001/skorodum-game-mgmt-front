<template>
    <div class="card">
        <h3 class="title">{{ props.title }}</h3>
        <p class="answers__title">Варианты ответов:</p>
        <ol>
            <li :key="i" v-for="(answer, i) in props.variations">
                <span class="answer__text">
                    {{ answer }}
                </span>
            </li>
        </ol>
        <p class="correct__answer-text">
            Номер правильного ответа: <span class="correct__answer-num">{{ props.correct }}</span>
        </p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
    title: string,
    variations: string[],
    correct: number | string
}>()
</script>

<style scoped>
.title {
    color: black;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0.5em 0;
}
.answers__title {
    font-weight: 700;
    color: black;
}
.answer__text {
    font-weight: 400;
}
ol {
    counter-reset: num;
    font-weight: bold;
    list-style-type: none;
    margin: 1em;
}
li:before {
    margin: 0 0.7em 0 2em;
    content: counter(num) '.';
    counter-increment: num;
    font-weight: bold;
}
.card {
    padding: 1em 2em;
    border-radius: 2em;
    border: 1px solid #d4d4d4;
    margin: 1.5em auto;
}
.correct__answer-text {
    font-weight: 700;
}
.correct__answer-num {
    color: black;
    font-weight: 700;
    margin: auto 0.5em;
}
@media screen and (max-width: 500px) {
    ol{
        margin-left:0;
    }
    li:before{
        margin: 0 0.5em 0 0;
    }
}
</style>
