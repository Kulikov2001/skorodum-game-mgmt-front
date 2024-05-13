<template>
    <div class="wrapper">
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
                <MyCheckboxComponent @tapped="handleCorrectClick(n-1)" :active="correctAnswer[n-1]" />
            </li>
        </ol>
        <CategoryFormComponent v-model="categoryForm" />
        <div style="width: 100%; text-align: center">
            <button
                @click="handleAddCategory"
                color="var(--main)"
                style="text-align: center; margin: 1em auto"
            >
                Добавить категорию
            </button>
            <!-- vs-button -->
        </div>
        <ButtonsBarComponent
                v-if="!hideBtn"
            @Add="handleAddQuestion"
            @Cancel="resetQuestion"
            :add="true"
            :cancel="true"
        />
    </div>
</template>

<script setup lang="ts">
import ButtonsBarComponent from '@/components/base/ButtonsBarComponent.vue'
import CategoryFormComponent from '@/components/question/CategoryFormComponent.vue'
import type {ICategory} from '@/components/question/CategoryFormComponent.vue'
import InputComponent from '@/components/base/InputComponent.vue'
import { ref, onMounted } from 'vue'
import MyCheckboxComponent from '@/components/base/MyCheckboxComponent.vue'
import { useGameStore } from '@/stores/game'
import Vector4Answers from '@/assets/Vector4Answers.vue'
import { config } from '@/config'
import axios from 'axios'
const count = ref<number>(4)
const props = defineProps<{
    hideBtn?: boolean;
}>();
const hideBtn = ref<boolean>(props.hideBtn);
const answerText = ref<string[]>([])
const correctAnswer = ref<boolean[]>([false,false,false,false])
const store = useGameStore()
const categoryForm = ref<{
    selected: ICategory[]
    searchText: string
}>({
    selected: [],
    searchText: ''
})
const handleCorrectClick = async(n: number) => {
    correctAnswer.value[n] === true ? correctAnswer.value[n] = false : correctAnswer.value[n] = true
}
onMounted(() => {
    if (store.currentQuestion.answers) {
        count.value =
            store.currentQuestion.answers.length < 4 ? 4 : store.currentQuestion.answers.length
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
function resetQuestion() {
    correctAnswer.value = []
    answerText.value = []
    count.value = 4
    store.clearQuestion()
}
const handleAddQuestion = () => {
    store.currentQuestion.type = 'select'
    store.currentQuestion.answers = answerText.value
    store.currentQuestion.correct_answer = answerText.value[correctAnswer.value.indexOf(true)]
    store.addCurrentQuestionToCurrentRound()
    resetQuestion()
}
const handleAddCategory = () => {
    if (categoryForm.value!.searchText.length > 2) {
        axios
            .post(config.urls.create.category, { name: categoryForm.value?.searchText })
            .then((res) => {
                store.setCategories().then(() => {
                    categoryForm.value!.selected.push(res.data)
                })
            })
            .catch((error) => {
                store.globalNotification.message = error.message
                store.globalNotification.type = 'error'
            })
    }
}
</script>

<style scoped>
.wrapper {
    transition: max-height 2s ease;
    overflow: hidden;
}
.wrapper:not(.active) {
    max-height: auto;
}
.wrapper.active {
    max-height: none !important;
}
.accordion__wrapper :deep(h2) {
    color: var(--text-darker);
    font-size: 1.25em;
}
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
