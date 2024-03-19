<template>
    <input type="checkbox" hidden v-model="isChecked" />
    <div class="checkbox__wrapper">
        <div class="myCheckbox" @click="handleCheckboxClick">
            <CheckboxBox class="cbox" :class="{ checked: isChecked }" />
            <CheckElem v-if="isChecked" class="checkmark" :class="{ checked: isChecked }" />
        </div>
    </div>
</template>

<style scoped>
.checkbox__wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    place-items: center;
}
.cbox.checked {
    background: var(--main);
}
.checkmark.checked {
    fill: white;
}
.cbox,
.checkmark {
    transition: all 0.25s ease;
}
.myCheckbox {
    position: relative;
    fill: var(--text-darker) !important;
}
.myCheckbox:not(.checked) {
    fill: var(--text-darker);
}
.checkmark {
    position: absolute;
    top: 5%;
    left: 5%;
}
.myCheckbox:not(.checked) :deep(.checkbox__box) {
    fill: none;
    stroke: var(--main);
    stroke-width: 3;
    stroke-linejoin: round;
}
</style>

<script setup lang="ts">
import CheckboxBox from '@/assets/CheckboxBox.vue'
import CheckElem from '@/assets/CheckElem.vue'
import { ref } from 'vue'
const isChecked = defineModel<boolean>({ default: false })

const handleCheckboxClick = () => {
    isChecked.value = !isChecked.value
}
</script>
