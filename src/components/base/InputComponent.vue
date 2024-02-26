<template>
    <input type="text" :placeholder="props.placeholder" v-model="inputValue" @input="emitValue" />
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: String,
    placeholder: String
})
const inputValue = ref(props.modelValue)

const emitValue = () => {
    emit('update:modelValue', inputValue.value)
}
</script>

<style scoped>
input {
    text-align: center;
    border-radius: 2em;
    border: 1px solid var(--text-darker);
    padding: 2em;
    width: 100%;
    display: block;
    font-weight: bold;
}
input::placeholder {
    opacity: 0.5;
    text-transform: uppercase;
    text-align: center;
}
</style>
