<template>
    <QuestionFormComponent />
    <CategoryFormComponent />
    <div style="width: 100%; text-align: center;">
    <vs-button color="var(--main)" style="text-align: center; margin: 1em auto;">Добавить категорию</vs-button>
</div>
    <ButtonsBarComponent :add="true" :cancel="true" />
</template>

<script setup lang="ts">
import ButtonsBarComponent from '@/components/base/ButtonsBarComponent.vue'
import QuestionFormComponent from '@/components/question/QuestionFormComponent.vue'
import CategoryFormComponent from '@/components/question/CategoryFormComponent.vue'
</script>

<style scoped>

</style>
