<template>
    <div class="wrapper">
        <textarea v-model="textarea"></textarea>

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
</script>
