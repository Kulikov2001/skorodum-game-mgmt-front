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
                <li
                    v-for="item in questionList"
                    :key="item.id"
                    class="question__list-item"
                >
                    <!-- TODO: Оживить чекбокс и v-for -->
                    <MyCheckboxComponent style="flex-grow: 0; flex-shrink: 12" />
                    <div class="question__info">
                        <div class="row question">
                            <div class="question__title">{{  item.question }}</div>
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
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SearchFieldComponent from '@/components/base/SearchFieldComponent.vue'
import MyCheckboxComponent from '@/components/base/MyCheckboxComponent.vue'
import AttachmentIco from '@/assets/AttachmentIco.vue'
import EditableIco from '@/assets/EditableIco.vue'
import DeleteBtn from '@/assets/DeleteBtn.vue'
import type { IQuestion } from '@/stores/game'
import {CLEAN_QUESTION, useGameStore} from '@/stores/game'
import axios from 'axios'
import { config } from '@/config'
import type { ICategory } from '@/components/question/CategoryFormComponent.vue'

const questionList = ref<any[]>([]);


const getQuestions = (): Promise<any> => {
    return axios
        .get(config.urls.get.all.questions)
        .then((res: any) => {
            const result: IQuestion[] = [];
            res.data.forEach((el: any) => {
                const temp: IQuestion = {
                    id: el.id,
                    type: el.question_type,
                    question: el.question_text,
                    answers: el.answers.split(',') /*TODO: Изменить сепоратор на ;*/,
                    correct_answer: el.correct_answer,
                    time_to_answer: el.time_to_answer,
                    media_data: {
                        show_image: el.show_image,
                        video: {
                            before: el.video_before,
                            after: '' /*TODO: Сделать на беке*/
                        },
                        image: {
                            before: el.image_before,
                            after: el.image_after,
                            player_displayed: el.player_display
                        }
                    },
                    categories: []
                };
                result.push(temp)
            })
            return result
        })
        .catch((error: any) => {
            console.error(error)
            // globalNotification.value.message = error.message
            // globalNotification.value.isFixed = true
            // globalNotification.value.type = 'error'
        })
    //console.log(result);
}
// const emit = defineEmits<{
//     (e: 'titleClick'): void
// }>()
// const emitTitleClick = () => {
//     emit('titleClick')
// }
const selectedQ = ref<number[]>([])
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
const handleDelete = async (question: IQuestion) => {
    axios
        .delete(config.urls.delete.question + question.id + '/')
        .then((res) => {
            questionList.value = getQuestions()
        })
        .catch((err) => {
            console.error(err)
        })
}
// const toggleQ = (q: any) => {
//     if (selectedQ.value.includes(q)){
//         selectedQ.value = selectedQ.value.filter(item => item != q);
//     }
//     else {
//         selectedQ.value.push(q);
//     }
// }
onMounted(() => {
    getQuestions().then((result)=>{
        questionList.value = result;
    })
})
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
