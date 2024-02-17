<template>
    <div class="center grid">
        <div class="back" @click="$router.push(props.back[1])">&larr; {{ props.back[0] }}</div>
        <div class="title">{{ props.title }}</div>
        <div></div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string
    back: string[]
}>()
</script>
<style scoped>
.grid {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
}
.back{
    cursor:pointer;
}
.center {
    text-align: center;
    vertical-align: center;
    align-items: baseline;
}
.title {
    font-size: 2em;
    font-weight: bold;
    color: var(--primary);
}
</style>
