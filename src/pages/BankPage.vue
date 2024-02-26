<template>
    <h1>Банк вопросов</h1>
    <div class="wrapper">
        <article>
            <h2>Вопросы:</h2>
            <BankQuestionComponent />
            <div class="bnk__btn-row">
                <div class="bnk__btn">
                    <button>Создать раунд</button>
                    <div class="bnk__btn-desk">Создать раунд из выбранных вопросов</div>
                </div>
                <div class="bnk__btn">
                    <div class="icon">
                    <DocDown width="30" height="30" stroke="var(--main)" stroke-width="0.5"/></div>
                    <div class="bnk__btn-desk">Конвертировать в Word</div>
                </div>
            </div>
        </article>
        <aside>
            <h2>Категории:</h2>
            <CategoryFormComponent />
            <div class="createQuestion__btn">
                <AddCircleIn class="createQuestion__icon"/>
                <div class="createQuestion__btn-title">Создать новый вопрос</div>
            </div>
        </aside>
    </div>
</template>

<script setup lang="ts">
import CategoryFormComponent from '@/components/question/CategoryFormComponent.vue'
import BankQuestionComponent from '@/components/question/BankQuestionComponent.vue'
import AddCircleIn from '@/assets/AddCircleIn.vue';
import DocDown from '@/assets/DocDown.vue';
</script>

<style scoped>
.createQuestion__btn-title{
    margin-bottom: 3em;
}
.bnk__btn-row{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.bnk__btn{
    justify-content: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 1em;
    margin: 2em .5em;
    padding: 1em 3em;
}
.bnk__btn button{
    padding: .9em 2.5em;
    width: auto;
    border: none;
    outline: none;
    background-color: var(--main);
    color: white;
    border-radius: .5em;
    margin: .5em auto;
}
.bnk__btn .icon{
    margin: 0 auto;
    text-align: center;
}
.bnk__btn-desk{
    text-align: center;
    margin: .5em auto;
}
.createQuestion__icon{
    stroke: var(--main);
    stroke-width: 1px;
    margin: 3em 0 1em 0;
}
.createQuestion__btn{

    background-color: white;
    border-radius: 1em;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    width:90%;
    justify-content: center;
    padding:2em auto;
    align-items: center;
    margin: 0 auto;
}
article{
    margin: 1em;
}
h1,h2 {
    text-align: center;
    font-weight: bold;
}
.wrapper {
    background-color: var(--background);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
}
aside :deep(.search-field){
    width: 80%;
}
@media screen and (min-width: 1200px) {
    .wrapper{
        width: 1200px;
    }
}
@media screen and (max-width: 1100px) {
    .wrapper{
        width: 1000px;
        flex-wrap: wrap;
    }
}
@media screen and (max-width: 900px) {
    .wrapper{
        width: auto;
    }
    :deep(.wrapper__list){
        width: 430px;
    }
}
aside {
    max-width: 400px;
    float: right;
}
</style>
