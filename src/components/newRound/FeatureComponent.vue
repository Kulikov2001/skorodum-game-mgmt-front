<template>
    <div class="wrapper">
        <div v-if="props.ico" class="icon">
            <img src="" alt="" />
        </div>
        <h2>&laquo;{{ props.title }}&raquo;</h2>
        <div class="increaser-container">
            <span class="minus">&minus;</span>
            <span class="number">{{ props.default }}</span>
            <span class="plus">&plus;</span>
        </div>
        <div v-if="props.desc" class="desc">{{ props.desc }}</div>
    </div>
</template>
<style scoped>
.wrapper {
    display: inline-block;
    color: var(--text-darker);
    padding: 2em;
    text-align: center;
    background-color: white;
    margin: 1em;
    border-radius: 1em;
}
h2 {
    text-align: center;
    font-weight: 500;
}
.increaser-container {
    text-align: center;
    font-weight: bold;
    font-size: 2em;
}
.increaser-container span {
    font-weight: 700;
    padding: 0.5em 0.5em 0.3em 0.5em;
    border-bottom: 1px solid var(--text-darker);
}
.number {
    color: black;
}
.minus,
.plus {
    cursor: pointer;
}
.desc {
    margin-top: 2em;
}
</style>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
const props = defineProps<{
    title: string
    max: number
    min: number
    default: number
    desc: string
    ico?: string
    increase: number
}>()
</script>
