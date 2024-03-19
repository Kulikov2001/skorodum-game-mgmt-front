<template>
    <input type="text" :placeholder="props.placeholder" v-model="inputModel" />
</template>

<script setup lang="ts">
const props = defineProps({
    placeholder: String
})
const inputModel = defineModel<string>()
</script>

<style scoped>
input {
    text-align: center;
    border-radius: 2em;
    border: 1px solid var(--text-grey);
    padding: 2em;
    width: 100%;
    display: block;
    font-weight: bold;
    transition: border 0.3s ease;
}
input:focus {
    border: 1px solid var(--text-darker);
}
input::placeholder {
    user-select: none;
    opacity: 0.3;
    text-transform: uppercase;
    text-align: center;
}
</style>
