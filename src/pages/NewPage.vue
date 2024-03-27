<template>
    <div>
        <NotificationComponent v-model="notification" />
        <TitleBarComponent :title="'Новая игра'" :back="['Вернуться к списку игр', '/games']" />
        <NewGameFormComponent />
        <RoundsListComponent />
        <ButtonsBarComponent @Back="$router.back()" :back="true" :save="true" @Save="store.createGame()" />
    </div>
</template>
<script setup lang="ts">
import ButtonsBarComponent from '@/components/base/ButtonsBarComponent.vue'
import TitleBarComponent from '@/components/base/TitleBarComponent.vue'
import NewGameFormComponent from '@/components/newGame/NewGameFormComponent.vue'
import RoundsListComponent from '@/components/newGame/RoundsListComponent.vue'
import { useGameStore } from '@/stores/game'
import NotificationComponent from '@/components/base/NotificationComponent.vue'
import type { INotification } from '@/components/base/NotificationComponent.vue'
import { ref } from 'vue'
const store = useGameStore()
const notification = ref<INotification>(store.globalNotification)
</script>
<style scoped></style>
