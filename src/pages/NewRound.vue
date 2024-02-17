<template>
    <div>
        <TitleBarComponent :title="'Новый раунд'" :back="['Вернуться к игре', '/new']" />
        <CreateQuestionComponent />
        <ButtonsBarComponent />
    </div>
</template>
<script setup lang="ts">
import ButtonsBarComponent from '@/components/base/ButtonsBarComponent.vue'
import TitleBarComponent from '@/components/base/TitleBarComponent.vue'
import NewRoundFormComponent from '@/components/newRound/NewRoundFormComponent.vue'
import CreateQuestionComponent from '@/components/newRound/CreateQuestionComponent.vue'

</script>
<style scoped></style>
