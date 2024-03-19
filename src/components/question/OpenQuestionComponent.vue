<template>
    <div class="wrapper">
        <textarea></textarea>
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
</style>

<script setup lang="ts"></script>
