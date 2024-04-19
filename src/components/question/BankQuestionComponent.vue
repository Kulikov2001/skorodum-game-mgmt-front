<template>
    <div class="wrapper__question-component">
        <div class="options__bar">
            <div class="option search">
                <SearchFieldComponent
                    :placeholder="'Поиск вопросов...'"
                    @userinput="handleChange"
                    v-model="searchText"
                    style="width: 100%"
                />
            </div>
            <div class="option">
                <MyCheckboxComponent
                        :active="isOpened"
                        @tapped="isOpened = !isOpened"
                />
                <span>Открытый вопрос</span>
            </div>
            <div class="option">
                <MyCheckboxComponent
                        :active="isClosed"
                        @tapped="isClosed = !isClosed"
                />
                <span>Закрытый вопрос</span>
            </div>
            <div class="option">
                <MyCheckboxComponent
                        :active="isPhoto"
                        @tapped="isPhoto = !isPhoto"
                />
                <span>Вопрос-фото</span>
            </div>
        </div>
        <div class="wrapper__list">
            <ul class="question__list">
                <li
                    v-for="item in questionList.slice(0,5)"
                    :key="item.id"
                    class="question__list-item"
                >
                    <!-- TODO: Оживить чекбокс и v-for -->
                    <MyCheckboxComponent
                            :active="selectedQuestions.some((checked) => checked === item.id)"
                            @tapped="handleCheckboxClick(item)"
                            style="flex-grow: 0; flex-shrink: 12;" />
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
                            <AttachmentIco v-if="item.media_data" class="btn" width="22" />
                        </div>
                        <div class="status__ico-item">
                            <EditableIco class="btn" width="18" />
                        </div>
                        <div class="status__ico-item">
                            <DeleteBtn class="btn" @click="handleDelete(item)" width="18" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <ButtonsBarComponent :add="true" @Add="addSelectedQuestions" />
    </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import SearchFieldComponent from '@/components/base/SearchFieldComponent.vue'
import MyCheckboxComponent from '@/components/base/MyCheckboxComponent.vue'
import AttachmentIco from '@/assets/AttachmentIco.vue'
import EditableIco from '@/assets/EditableIco.vue'
import DeleteBtn from '@/assets/DeleteBtn.vue'
import type {BIQuestion, IQuestion} from '@/stores/game'
import {CLEAN_QUESTION, useGameStore} from '@/stores/game'
import axios from 'axios'
import { config } from '@/config'
import type { ICategory } from '@/components/question/CategoryFormComponent.vue'
import ButtonsBarComponent from "@/components/base/ButtonsBarComponent.vue";
const store = useGameStore();
const questionList = ref<IQuestion[]>([]);
store.getQuestions().then((q)=> questionList.value = q)
const isOpened = ref(false);
const isClosed = ref(false);
const isPhoto = ref(false);


const selectedQuestions = ref<number[]>([])
const addSelectedQuestions = async() => {
    return 0;
    // const question = [];
    // await selectedQuestions.value.forEach((id)=>{
    //     axios.get(config.urls.get.question + id + '/').then((res)=>{
    //         if (res.status === 200){
    //             res.data.
    //             question.push(res.data)
    //         }
    //     })
    // });
    // store.currentRound.questions.push(question) ?? store.currentRound.question = question
}
const searchText = ref<string>('')
const handleChange = async () => {
    // axios.get(
    //     config.urls.search.question + '?query=' + encodeURIComponent(searchText.value)
    // ).then(function (res) {
    //     if (res.status === 200) {
    //         searchResult.value = res.data.results
    //         categoryFormModel.value.selected.forEach(item => !searchResult.value.includes(item) ?? searchResult.value.unshift(item))
    //     }
    // })
}
const handleCheckboxClick = async(triggered: IQuestion) => {
    if (selectedQuestions.value.some((item) => item === triggered.id)) {
        selectedQuestions.value = selectedQuestions.value.filter((already) => already !== triggered.id);
    } else {
        if (typeof triggered.id === 'number') {
            selectedQuestions.value.push(triggered.id);
        }
    }
}
const handleDelete = async (question: IQuestion) => {
    try{
        await axios.delete(config.urls.delete.question + question.id + '/')
    } catch (e) {
        console.error(e)
    }
}


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
.btn {
    user-select: none;
    cursor: pointer;
}
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
