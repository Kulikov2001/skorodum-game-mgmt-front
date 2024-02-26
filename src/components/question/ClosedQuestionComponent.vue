<template>
    <QuestionFormComponent />
    <CategoryFormComponent />
    <vs-button>Добавить категорию</vs-button>
    <ButtonsBarComponent :add="true" :cancel="true" />
</template>

<script setup lang="ts">
import ButtonsBarComponent from '@/components/base/ButtonsBarComponent.vue'
import QuestionFormComponent from '@/components/question/QuestionFormComponent.vue'
import CategoryFormComponent from '@/components/question/CategoryFormComponent.vue'
</script>

<style scoped></style>
