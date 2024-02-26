<template>
    <ol type="1" start="1">
        <li>
            <span class="number">1.</span>
            <InputComponent class="question-field" v-model="QuestionText1" /><MyCheckboxComponent />
        </li>
        <li>
            <span class="number">2.</span>
            <InputComponent class="question-field" v-model="QuestionText2" /><MyCheckboxComponent
                v-model="q2cb"
            />
        </li>
        <li>
            <span class="number">3.</span>
            <InputComponent class="question-field" v-model="QuestionText3" /><MyCheckboxComponent />
        </li>
        <li>
            <span class="number">4.</span>
            <InputComponent class="question-field" v-model="QuestionText4" /><MyCheckboxComponent
                v-model="q2cb"
            />
        </li>
    </ol>
</template>

<script setup lang="ts">
import InputComponent from '@/components/base/InputComponent.vue'
import { ref } from 'vue'
import MyCheckboxComponent from '@/components/base/MyCheckboxComponent.vue'
const QuestionText1 = ref('')
const QuestionText2 = ref('')
const QuestionText3 = ref('')
const QuestionText4 = ref('')
const q2cb = ref(true)
QuestionText1.value = 'Кто был царём всея руси'
</script>

<style scoped>
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
