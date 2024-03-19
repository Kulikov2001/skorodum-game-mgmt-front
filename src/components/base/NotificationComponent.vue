<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

export interface INotification {
    message: string
    type: string
    isFixed?: boolean
    clear: Function
}

import ErrorIco from '@/assets/ErrorIco.vue'
import SuccessIco from '@/assets/SuccessIco.vue'
import InfoIco from '@/assets/InfoIco.vue'
import { useGameStore } from '@/stores/game'
const store = useGameStore()
const notificationModel = defineModel<INotification>({
    default: {
        message: '',
        type: '',
        isFixed: false,
        clear: () => {
            notificationModel.value.message = ''
            notificationModel.value.type = ''
        }
    }
})
onMounted(() => {
    store.globalNotification.clear()
})
onUnmounted(() => {
    store.globalNotification.clear()
})
</script>

<template>
    <div
        v-if="notificationModel.message"
        class="notification__wrapper"
        :class="{ fixed: notificationModel.isFixed }"
    >
        <div
            @click="notificationModel.clear"
            class="box"
            :class="{
                success: notificationModel.type === 'success',
                error: notificationModel.type === 'error'
            }"
        >
            <ErrorIco
                v-if="notificationModel.type === 'error'"
                :color="'var(--error-notification'"
            />
            <SuccessIco
                v-else-if="notificationModel.type === 'success'"
                :color="'var(--success-notification)'"
            />
            <InfoIco v-else :color="'var(--main)'" />
            <span class="message">{{
                notificationModel.message === 'Network Error'
                    ? 'Проверьте, чтобы сервер и вы находились в одной сети и перезагрузите страницу'
                    : notificationModel.message
            }}</span>
        </div>
    </div>
</template>

<style scoped>
.box {
    margin: 1em auto;
    width: 100%;
    padding: 1em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: var(--notification-bg);
    border: 1px solid var(--main);
    border-radius: 1em;
    z-index: 2;
}
.message {
    text-align: center;
    color: #181818;
    margin-left: 0.5em;
    font-size: 16px;
}

.success {
    background-color: var(--success-notification-bg);
    border: 1px solid var(--success-notification);
}
.error {
    background-color: var(--error-notification-bg);
    border: 1px solid var(--error-notification);
}
.fixed .success {
    background-color: #d6f0e1;
}
.fixed .error {
    background-color: #fbd8d8;
}
.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    place-items: center;
}
</style>
