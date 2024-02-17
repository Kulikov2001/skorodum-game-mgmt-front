<template>
    <div class="round__wrapper">
        <div class="form">
            <div class="row">
                <input type="text" placeholder="НАЗВАНИЕ ИЛИ НОМЕР РАУНДА" />
            </div>
            <div class="row">
                <vs-radio val="default"> Обычный раунд — идёт в зачёт </vs-radio>
                <vs-radio val="test"> Пробный раунд — вне в зачёта </vs-radio>
                <vs-radio val="blitz"> Блиц </vs-radio>
            </div>
        </div>
        <div class="features">
            <FeatureComponent
                v-for="(item, key) in allFeatures"
                :key="key"
                :title="item.title"
                :max="item.max"
                :min="item.min"
                :default="item.default"
                :desc="item.desc"
                :increase="item.increase"
                :ico="item.ico"
            />
        </div>
    </div>
</template>

<style scoped>
.round__wrapper {
    background-color: var(--background);
    padding: 2em;
}
</style>

<script setup lang="ts">
import FeatureComponent from '@/components/newRound/FeatureComponent.vue'
const allFeatures = [
    {
        title: 'Убрать неверный ответ',
        increase: 1,
        default: 1,
        min: 0,
        max: 10,
        desc: 'Сколько раз за 1 раунд можно использовать',
        ico: null
    },
    {
        title: 'Ставлю на...',
        increase: 1,
        default: 0,
        min: 0,
        max: 10,
        desc: 'Сколько раз за 1 раунд можно использовать',
        ico: null
    },
    {
        title: 'Один за всех',
        increase: 1,
        default: 0,
        min: 0,
        max: 10,
        desc: 'Сколько раз за 1 раунд можно использовать',
        ico: null
    },
    {
        title: 'Ва-банк',
        increase: 1,
        default: 0,
        min: 0,
        max: 10,
        desc: 'Сколько раз за 1 раунд можно использовать',
        ico: null
    },
    {
        title: 'Баллы на бочку',
        increase: 1,
        default: 0,
        min: 0,
        max: 10,
        desc: 'Сколько раз за 1 раунд можно использовать',
        ico: null
    },
    {
        title: 'Множитель',
        increase: 1,
        default: 3,
        min: 0,
        max: 10,
        desc: 'Сколько раз за 1 раунд можно использовать',
        ico: null
    },
    {
        title: 'Время на ответ',
        increase: 1,
        default: 0,
        min: 0,
        max: 10,
        desc: null,
        ico: null
    }
]
</script>
