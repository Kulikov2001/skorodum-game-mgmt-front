<template>
    <input v-model="modelValue" :checked="modelValue.value" type="checkbox" /><label @click="handleClick"></label>
</template>

<script setup lang="ts">
const modelValue = defineModel();

const handleClick = () =>{
    modelValue.value = !modelValue.value;
}
</script>

<style scoped lang="scss">
input[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
}
label {
    --switch-size: 1.5em;
    --switch-size2: calc(var(--switch-size) / 0.375);
    cursor: pointer;
    text-indent: -9999px;
    width: var(--switch-size2);
    height: calc(var(--switch-size2) / 2);
    background: var(--text-grey);
    display: block;
    border-radius: 100px;
    position: relative;
}

label:after {
    --switch-size: 1.5em;
    --switch-size2: calc(var(--switch-size) / 0.375);
    content: '';
    position: absolute;
    top: calc(var(--switch-size) / 6);
    left: calc(var(--switch-size) / 6);
    width: var(--switch-size);
    height: var(--switch-size);
    background: #fff;
    border-radius: var(--switch-size);
    transition: 0.3s;
}

input:checked + label {
    background: var(--main);
}

input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
}

label:active:after {
    width: 50px;
}

// centering
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
