<template>
    <nav class="desc">
        <div class="col"></div>
        <div class="col" style="text-align: center">Варианты ответов</div>
        <div class="col" style="text-align: right; position: relative">
            Выберите<br />
            правильный ответ
            <vector4-answers style="position: absolute; right: -50px; top: 20px" />
        </div>
    </nav>
    <ol type="1" start="1">
        <li v-for="n in count" :key="n">
            <span class="number">{{ n }}.</span>
            <InputComponent class="question-field" v-model.lazy="answerText[n - 1]" />
            <MyCheckboxComponent v-model="correctAnswer[n - 1]" />
        </li>
    </ol>
</template>

<script setup lang="ts">
import InputComponent from '@/components/base/InputComponent.vue'
import { ref, computed, onMounted } from 'vue'
import MyCheckboxComponent from '@/components/base/MyCheckboxComponent.vue'
import { useGameStore } from '@/stores/game'
import Vector4Answers from '@/assets/Vector4Answers.vue'
const count = ref<number>(4)
const answerText = ref<string[]>([])
const correctAnswer = ref<boolean[]>([])
const store = useGameStore()
onMounted(() => {
    if (store.currentQuestion.answers) {
        count.value = store.currentQuestion.answers.length
        answerText.value = store.currentQuestion.answers
        correctAnswer.value = []
        answerText.value.forEach((el) => {
            if (el === store.currentQuestion.correct_answer) {
                correctAnswer.value.push(true)
            } else {
                correctAnswer.value.push(false)
            }
        })
    }
})
</script>

<style scoped>
.desc {
    width: 75%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 1em auto;
    align-items: end;

    color: var(--text-darker);
}
.desc .col {
    font-weight: 500;
}
@media screen and (max-width: 600px) {
    .desc {
        display: none;
    }
}
.question-field {
    text-align: left;
    padding-left: 3em;
    font-size: 1em;
    font-weight: 400;
    margin: 0.5em;
}
:deep(input) {
    padding: 1.15em;
    border-radius: 1em;
}
li {
    position: relative;
    display: grid;
    grid-template-columns: 10fr 2fr;
}
.number {
    position: absolute;
    left: 2em;
    top: 1.45em;
    color: black;
    font-weight: 700;
    display: inline;
}
</style>
