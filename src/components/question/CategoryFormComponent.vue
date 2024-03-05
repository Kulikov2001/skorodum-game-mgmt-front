<template>
    <div class="category__wrapper">
        <h2>Категории</h2>
        <SearchFieldComponent />
        <div class="checkboxes__wrapper">
            <MySwitchComponent v-for="category in mockcategory" :key="category.id">
                {{ category.title }}</MySwitchComponent
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import SearchFieldComponent from '@/components/base/SearchFieldComponent.vue'
import MySwitchComponent from '@/components/base/MySwitchComponent.vue'
import { ref } from 'vue'
const myswitch = ref(true)
const mockcategory = [
    {
        id: 1,
        title: 'Авиация',
        val: 'avia'
    },
    {
        id: 2,
        title: 'География',
        val: 'avia'
    },
    {
        id: 3232,
        title: 'Кораблестроение, мореплавание',
        val: 'avia'
    },
    {
        id: 1123,
        title: 'Космос',
        val: 'avia'
    },
    {
        id: 14,
        title: 'Личности',
        val: 'avia'
    },
    {
        id: 10,
        title: 'Любопытный факт',
        val: 'avia'
    },
    {
        id: 222,
        title: 'Грамматика',
        val: 'avia'
    },
    {
        id: 322,
        title: 'Искусство',
        val: 'avia'
    },
    {
        id: 43,
        title: 'Счёт',
        val: 'avia'
    },
    {
        id: 42,
        title: 'Тестовый вопрос',
        val: 'avia'
    }
]
</script>

<style scoped>
.checkboxes__wrapper {
    display: inline-flex;
    flex-wrap: wrap;
}
h2 {
    font-weight: 700;
    margin: 1em auto;
}
.category__wrapper {
    margin: 0.5em;
}
.vs-switch {
    width: 5em !important;
    min-height: 50px !important;
    font-size: 24px;
}
.item-on,
.item-off {
    min-width: 50px !important;
}
.vs-switch--circle {
    min-height: 50px !important;
}
@media screen and (max-width: 500px) {
    .checkboxes__wrapper{
        margin-top: 1em;
    }
    :deep(.checkbox__wrapper){
        margin: 0.75em;
    }
}
</style>
