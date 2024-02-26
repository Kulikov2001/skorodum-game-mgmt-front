<template>
    <div class="wrapper__question-component">
        <div class="options__bar">
            <div class="option search">
            <SearchFieldComponent style="width: 100%;"/>
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
                    <MyCheckboxComponent style="flex-grow: 0; flex-shrink: 12;" />
                    <div class="question__info">
                        <div class="row question">                        
                            <div class="question__title"> {{ item.title }}</div>
                        </div>
                        <div class="row category">
                            <div 
                                class="category__badge"
                                v-for="(catitem, catkey) in item.category"
                                :key="catkey"
                                >
                                {{ catitem }}
                            </div>
                        </div>
                    </div>
                    <div class="status__ico">
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
import SearchFieldComponent from '@/components/base/SearchFieldComponent.vue'
import MyCheckboxComponent from '@/components/base/MyCheckboxComponent.vue'
import AttachmentIco from '@/assets/AttachmentIco.vue'
import EditableIco from '@/assets/EditableIco.vue'
import DeleteBtn from '@/assets/DeleteBtn.vue'
const mock = [
    {
        title: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        category: ['Авиация', 'География', 'Грамматика']
    },
    {
        title: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        category: ['Авиация']
    },
    {
        title: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        category: ['Авиация', 'География']
    },
    {
        title: 'Почему московский речной вокзал был построене не на самом берегу реки?'
    },
    {
        title: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        category: ['Авиация', 'Грамматика']
    },
    {
        title: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        category: ['Авиация', 'География', 'Грамматика']
    },
    {
        title: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        category: ['Авиация', 'География', 'Грамматика']
    },
    {
        title: 'Почему московский речной вокзал был построене не на самом берегу реки?',
        category: ['Авиация', 'География', 'Грамматика']
    }
]
</script>

<style scoped>

.status__ico{
    display:inline-flex;
    align-items: center;
}
.status__ico-item{
    margin: auto .5em;
    stroke: var(--text-grey);
}
.question__list-item{
    color: black;
    display: grid;
    grid-template-columns: 2fr 8fr 2fr;
    margin: 1em;
    padding: .5em;
    border-bottom: 1px solid var(--text-grey);
}
.question__title{
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
ul{
    list-style-type: none;
}
.wrapper{
    width: 100%;
}
.options__bar{
    width: 100%;
    display: flex;
    flex-direction: row;
}
.option:not(.search){
    display: inline-flex;
    width: max-content;
    align-items: center;
}
.option.search :deep(.search-field){
    width: 100%;
}
.option.search{
    margin-right: 2em;
}
.option span{
    white-space: pre;
    margin: auto .5em;
    vertical-align: center;
}
.wrapper__list{
    display:block;
    margin: 1em auto;
}
.category__badge{
    margin: auto .25em;
    border-radius: 2em;
    padding: .25em .8em;
    font-size: .9em;
    background: var(--text-grey);
    color: var(--text-darker);
}
.category__badge:first-child{
    margin-left: 0;
}
.row.category{
    margin-top: 1em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>
