<template>
    <div :class="{ active: isChecked }" class="checkbox__wrapper"> <!-- @click="itemClick" -->
        <input type="checkbox" hidden v-model="isChecked" />
        <span class="content">
            <slot />
        </span>
        <span class="mark"><CategoryPlusIcon :width="24" :height="24" /></span>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CategoryPlusIcon from '@/assets/CategoryPlusIcon.vue'
const isChecked = ref(false)

const itemClick = () => {
    isChecked.value = !isChecked.value
}
</script>
<style scoped>
.checkbox__wrapper {
    display: inline-flex;
    user-select: none;
    margin: 1em;
    background-color: transparent;
    font-weight: 500;
    padding: 0.5em 1em;
    cursor: pointer;
    border-radius: 2em;
    color: var(--text-darker);
    border: 2px dashed var(--text-darker);
    width: auto;
    box-sizing: content-box;
    transition: all 0.7s ease;
}
.checkbox__wrapper.active {
    background-color: var(--main) !important;
    color: white;
    border: 2px solid var(--main);
}
.mark {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
}
.checkbox__wrapper:not(.active) .mark :deep(.cat__mark-line) {
    stroke: #bcc0cc !important;
}
.checkbox__wrapper:not(.active) .mark :deep(.cat__mark-circle) {
    fill: #efefef !important;
}
.checkbox__wrapper:not(.active) .mark {
    transform: rotate(-45deg);
}
</style>
