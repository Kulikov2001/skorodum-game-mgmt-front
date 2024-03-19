<template>
    <div class="wrapper__question-component">
        <div class="options__bar">
            <div class="option search">
                <SearchFieldComponent style="width: 100%" />
            </div>
            <div class="option">
                <MyCheckboxComponent />
                <span>Открытый вопрос</span>
            </div>
            <div class="option">
                <MyCheckboxComponent />
                <span>Закрытый вопрос</span>
            </div>
            <div class="option">
                <MyCheckboxComponent />
                <span>Вопрос-фото</span>
            </div>
        </div>
        <div class="wrapper__list">
            <ul class="question__list">
                <li v-for="(item, key) in mock" :key="key" class="question__list-item">
                    <!-- TODO: Оживить чекбокс и v-for -->
                    <MyCheckboxComponent
                        v-model="selectedQ"
                        style="flex-grow: 0; flex-shrink: 12"
                    />
                    <div class="question__info">
                        <div class="row question">
                            <div class="question__title">{{ item.question }}</div>
                        </div>
                        <div class="row categories">
                            <div
                                class="category__badge"
                                v-for="(catitem, catkey) in item.categories"
                                :key="catkey"
                            >
                                {{ catitem }}
                            </div>
                        </div>
                    </div>
                    <div class="status__ico">
                        <!-- TODO: 1. Натянуть логику 2. Вынести в отдельный компонент-->
                        <div class="status__ico-item">
                            <AttachmentIco width="22" />
                        </div>
                        <div class="status__ico-item">
                            <EditableIco width="18" />
                        </div>
                        <div class="status__ico-item">
                            <DeleteBtn width="18" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchFieldComponent from '@/components/base/SearchFieldComponent.vue'
import MyCheckboxComponent from '@/components/base/MyCheckboxComponent.vue'
import AttachmentIco from '@/assets/AttachmentIco.vue'
import EditableIco from '@/assets/EditableIco.vue'
import DeleteBtn from '@/assets/DeleteBtn.vue'
import type { IQuestion } from '@/stores/game'
const mock: IQuestion[] = [
    {
        question: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        categories: ['Авиация', 'География', 'Грамматика']
    },
    {
        question: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        categories: ['Авиация']
    },
    {
        question: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        categories: ['Авиация', 'География']
    },
    {
        question: 'Почему московский речной вокзал был построене не на самом берегу реки?'
    },
    {
        question: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        categories: ['Авиация', 'Грамматика']
    },
    {
        question: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        categories: ['Авиация', 'География', 'Грамматика']
    },
    {
        question: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        categories: ['Авиация', 'География', 'Грамматика']
    },
    {
        question: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        categories: ['Авиация', 'География', 'Грамматика']
    }
]
// const emit = defineEmits<{
//     (e: 'titleClick'): void
// }>()

// const emitTitleClick = () => {
//     emit('titleClick')
// }
const selectedQ = ref<any>(true)
// const toggleQ = (q: any) => {
//     if (selectedQ.value.includes(q)){
//         selectedQ.value = selectedQ.value.filter(item => item != q);
//     }
//     else {
//         selectedQ.value.push(q);
//     }
// }
</script>

<style scoped>
/**
    Accordion styles
    START
    TODO: Логически привести в порядок, разобраться с анимацией и дерганьем
*/
.accordionEmbeded.wrapper__question-component {
    transition: max-height 2s ease;
    overflow: hidden;
}
.accordionEmbeded.wrapper__question-component:not(.active) {
    max-height: 0;
}
.accordionEmbeded.wrapper__question-component.active {
    max-height: none !important;
}
.accordionEmbeded.accordion__wrapper :deep(h2) {
    color: var(--text-darker);
    font-size: 1.25em;
}

/**
    Accordion styles
    END
*/

.status__ico {
    display: inline-flex;
    align-items: center;
}
.status__ico-item {
    margin: auto 0.5em;
    stroke: var(--text-grey);
}
.question__list-item {
    color: black;
    display: grid;
    grid-template-columns: 2fr 8fr 2fr;
    margin: 1em;
    padding: 0.5em;
    border-bottom: 1px solid var(--text-grey);
}
.question__title {
    font-weight: 500;
}
/* .question__info{
    flex-grow: 2;
    flex-shrink: 1;
}
.status__ico{
    flex-grow: 0;
    flex-shrink: 12;
} */
ul {
    list-style-type: none;
}
.wrapper {
    width: 100%;
}
.options__bar {
    width: 100%;
    display: flex;
    flex-direction: row;
}
.option:not(.search) {
    display: inline-flex;
    width: max-content;
    align-items: center;
}
.option.search :deep(.search-field) {
    width: 100%;
}
.option.search {
    margin-right: 2em;
}
.option span {
    white-space: pre;
    margin: auto 0.5em;
    vertical-align: center;
}
.wrapper__list {
    display: block;
    margin: 1em auto;
}
.category__badge {
    margin: auto 0.25em;
    border-radius: 2em;
    padding: 0.25em 0.8em;
    font-size: 0.9em;
    background: var(--text-grey);
    color: var(--text-darker);
}
.category__badge:first-child {
    margin-left: 0;
}
.row.categories {
    margin-top: 1em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
@media screen and (max-width: 500px) {
    .options__bar {
        flex-direction: column;
        width: 80%;
        margin: 0 auto;
    }
}
</style>
