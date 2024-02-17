<template>
    <div>
        <TitleBarComponent :title="'Новая игра'" :back="['Вернуться к списку игр', '/all']" />
        <NewGameFormComponent />
        <RoundsListComponent />
        <ButtonsBarComponent />
    </div>
</template>
<script setup lang="ts">
import ButtonsBarComponent from '@/components/base/ButtonsBarComponent.vue'
import TitleBarComponent from '@/components/base/TitleBarComponent.vue'
import NewGameFormComponent from '@/components/newGame/NewGameFormComponent.vue'
import RoundsListComponent from '@/components/newGame/RoundsListComponent.vue'
</script>
<style scoped></style>
