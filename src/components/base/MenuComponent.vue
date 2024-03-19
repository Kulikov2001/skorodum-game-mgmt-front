<template>
    <div class="menu__wrapper">
        <BtnNew :class="{ active: isOn(['new']) }" class="mainBtn-item" @click="newPage" />
        <BtnAll :class="{ active: isOn(['games']) }" class="mainBtn-item" @click="allPage" />
        <BtnBank :class="{ active: isOn(['bank']) }" class="mainBtn-item" @click="bankPage" />
    </div>
</template>
<script setup lang="ts">
import BtnNew from '@/assets/BtnNewSVG.vue'
import BtnAll from '@/assets/BtnAllSVG.vue'
import BtnBank from '@/assets/BtnBankSVG.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const newPage = async () => {
    router.push({ path: '/new' })
}
const allPage = async () => {
    router.push({ path: '/games' })
}
const bankPage = async () => {
    router.push({ path: '/bank' })
}
function isOn(_page: string[]): boolean {
    return _page.some((el) => router.currentRoute.value.path.split('/').includes(el))
}
</script>
<style scoped>
.active {
    filter: grayscale(1);
}
.menu__wrapper {
    display: inline-flex;
    justify-content: center;
    width: 100%;
}
.mainBtn-item {
    margin: 0 1em;
    width: 6em;
    height: auto;
    cursor: pointer;
}
</style>
