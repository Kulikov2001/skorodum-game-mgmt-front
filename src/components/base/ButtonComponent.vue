<script setup lang="ts">

</script>

<template>
<button>
    <slot/>
</button>
</template>

<style scoped>
button {
    cursor: pointer;
    margin: auto 1em;
    border: 1px solid var(--main);
    color: var(--main);
    outline: none;
    background: transparent;
    border-radius: 0.5em;
    padding: 1em 2em;
    font-size: 1.2em;
    font-weight: 500;
}
.red{
    color: var(--error-notification);
    border: 1px solid var(--error-notification);
}
.green{
    color: var(--success);
    border: 1px solid var(--success);
}
.white-bg{
    background: white;
}
</style>