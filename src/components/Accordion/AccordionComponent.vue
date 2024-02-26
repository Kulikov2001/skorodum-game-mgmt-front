<template>
    <div class="item__wrapper">
        <h2 @click="emitTitleClick">
            <span v-if="props.isOpen"><MarkIcon /></span>
            <span v-else><PlusIcon /></span>
            {{ props.title }}
        </h2>
        <slot />
    </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import MarkIcon from '@/assets/MarkIcon.vue'
import PlusIcon from '@/assets/PlusIcon.vue'
const props = defineProps<{
    title: string
    isOpen: boolean
}>()
const emit = defineEmits<{
    (e: 'titleClick'): void
}>()

const emitTitleClick = () => {
    emit('titleClick')
}
</script>
<style scoped>
.item__wrapper {
    background-color: var(--background);
    border-radius: 2em;
}
h2 {
    font-weight: 700;
    padding: 1em;
}
h2 span {
    margin-right: 1em;
}
</style>
