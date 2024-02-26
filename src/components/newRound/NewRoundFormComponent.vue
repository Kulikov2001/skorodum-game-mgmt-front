<template>
    <div class="round__wrapper">
        <div class="form">
            <div class="row">
                <div class="subrow">
                    <InputComponent
                        style="
                            border-radius: 0;
                            border: 0;
                            border-bottom: 1px solid var(--text-darker);
                            width: 90%;
                            margin: 0 auto;
                        "
                        v-model="roundName"
                        placeholder="Название или номер раунда"
                    />
                    <div class="radio__wrapper">
                        <RadioGroup :data="{ ...radiobtns }" v-model="roundType" />
                    </div>
                </div>
            </div>
            <div class="row"></div>
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
.radio__wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 1em 2em;
}
:deep(.myradio) {
    margin-left: 2em;
    margin-right: 2em;
}
.round__wrapper {
    background-color: var(--background);
    padding: 2em;
}
.subrow {
    border: 1px solid var(--text-darker);
    border-radius: 1em;
    background: white;
}
</style>
<script setup lang="ts">
import RadioGroup from '@/components/base/RadioGroup.vue'
import FeatureComponent from '@/components/newRound/FeatureComponent.vue'
import InputComponent from '@/components/base/InputComponent.vue'
import { ref } from 'vue'

const roundName = ref('')
const radiobtns = [
    {
        val: 'default',
        label: 'Обычный раунд — идёт в зачёт'
    },
    {
        val: 'test',
        label: 'Пробный раунд — вне в зачёта'
    },
    {
        val: 'blitz',
        label: 'Блиц'
    }
]
const roundType = ref(radiobtns[0])
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
