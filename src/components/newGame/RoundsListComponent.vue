<template>
    <h2 style="text-align: center">Раунды</h2>
    <div class="roundsList__wrapper">
        <vs-button @click="$router.push('/new/round')" v-if="true" color="var(--main)"
            >Добавить раунд</vs-button
        >
    </div>
</template>
<style scoped>
.roundsList__wrapper {
    border-radius: 2em;
    border: 2px solid var(--text-darker);
    background-color: var(--background);
    min-height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
<script setup lang="ts"></script>
