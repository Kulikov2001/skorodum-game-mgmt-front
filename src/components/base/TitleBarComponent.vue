<template>
    <div class="center grid">
        <div class="back" v-if="cwidth >= 960" @click="$router.push(props.back[1])">
            &larr; {{ props.back[0] }}
        </div>
        <div class="back" v-if="cwidth <= 960" @click="$router.push(props.back[1])">
            <BackBtn fill="var(--main)" width="32" height="32" />
        </div>
        <div class="title">{{ props.title }}</div>
        <div></div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import BackBtn from '@/assets/BackBtn.vue'

const props = defineProps<{
    title: string
    back: string[]
}>()
const cwidth = computed(() => window.innerWidth)
</script>
<style scoped>
.grid {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-auto-rows: 100px;
}
.back {
    cursor: pointer;
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
