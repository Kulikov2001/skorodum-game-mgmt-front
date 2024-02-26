<template>
    <div class="wrapper">
        <input type="radio" hidden v-model="val" />
        <svg width="20" height="20" class="radio-button" viewBox="0 0 20 20">
            <circle
                class="out"
                :class="{ checked: isChecked }"
                cx="10"
                cy="10"
                r="8"
                stroke-width="1"
            />
            <circle
                class="in"
                :class="{ checked: isChecked }"
                cx="10"
                cy="10"
                r="5"
                stroke-width="1"
            />
        </svg>
        <span class="label">
            <slot />
        </span>
    </div>
</template>
<style scoped>
.out {
    stroke: var(--text-darker);
    fill: white;
    transition: all 0.2s linear;
}
.checked {
    opacity: 1 !important;
    fill: #566bac;
    stroke: #455588 !important;
}
.in {
    opacity: 0;
    fill: white;
    stroke: #949cb1;
}
.label {
    vertical-align: center;
    margin: 0.25em;
}
.wrapper {
}
</style>
<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{
    val: string
    checked: boolean
}>()
const isChecked = ref(props.checked)
const val = ref(props.val)
const handleBtnClick = () => {
    emitValue()
}
const emit = defineEmits(['update:modelValue'])
const emitValue = () => {
    emit('update:modelValue', val.value)
}
watch(
    () => props.checked,
    (newValue) => {
        isChecked.value = newValue
    }
)
</script>
