<template>
    <div class="wrapper">
        <textarea placeholder="Введите правильный ответ на открытый вопрос..." v-model="textarea"></textarea>
        <buttons-bar-component v-if="!hideBtn" :add="true" @add="handleSave"/>
    </div>

</template>

<style scoped>
.wrapper {
    transition: max-height 2s ease;
    overflow: hidden;
}
.wrapper:not(.active) {
    max-height: 0;
}
.wrapper.active {
    max-height: unset !important;
}
.accordion__wrapper :deep(h2) {
    color: var(--text-darker);
    font-size: 1.25em;
}
textarea{
    width: 70%;
    display: block;
    margin: 1em auto;
    min-height: 300px;
    height: fit-content;
    outline: none;
    border: 1px solid var(--main);
    border-radius: 1em;
    padding: 2em;
    font-size: 14px;
    font-weight: 500;
}
</style>

<script setup lang="ts">

import {ref} from "vue";
import ButtonsBarComponent from "@/components/base/ButtonsBarComponent.vue";
import {useGameStore} from "@/stores/game";
const props = defineProps<{
    hideBtn?: boolean;
}>();
const store = useGameStore();
const textarea = ref('');
const hideBtn = ref<boolean>(props.hideBtn);
const handleSave = ()=>{
    store.currentQuestion.type = 'text'
    store.currentQuestion.correct_answer = textarea.value
    store.currentQuestion.answers = [];
    store.addCurrentQuestionToCurrentRound()
   //store.clearQuestion();
}
</script>
