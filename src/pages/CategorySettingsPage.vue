<template>
<h1>Настройки категорий</h1>
<ul>
    <li
        v-for="(item, key) in mock"
        :key="key"
    >
        <div class="title">{{item.title}}</div>
        <div class="btns">
            <EditableIco width="18" />
            <DeleteBtn width="18"/>
        </div>
    </li>
</ul>
<div class="addCat">
    <h3>Добавить новую категорию</h3>
    <InputComponent class="input-add" style="text-align: left; padding: 1.5em; margin: 1em auto;" :placeholder="'Названиие категории'" />
    <button>Добавить</button>
</div>
</template>

<script setup lang="ts">
import DeleteBtn from '@/assets/DeleteBtn.vue';
import EditableIco from '@/assets/EditableIco.vue';
import InputComponent from '@/components/base/InputComponent.vue';

const mock = [
    {
        title: 'Авиация',
    },
    {
        title: 'Авиация',
    },
    {
        title: 'Авиация',
    },
    {
        title: 'Авиация',
    },
    {
        title: 'Авиация',
    },
    {
        title: 'Авиация',
    },
    {
        title: 'Авиация',
    },
    {
        title: 'Авиация',
    },

];
</script>

<style scoped>
.addCat{
    text-align: center;
}
h3{
    font-weight: bold;
    margin: .5em;
    color: var(--text-darker);
}
.input-add :deep(input::placeholder){
    text-align: left !important;
}
button{
    padding: .9em 2.5em;
    width: auto;
    border: none;
    outline: none;
    background-color: var(--main);
    color: white;
    border-radius: .5em;
    margin: .5em auto;
}
h1{
    text-align: center;
    font-weight: bold;
}
ul{
    margin: 2em auto;
}
li{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--text-grey);
    padding: .5em;
}
.title{
    font-weight: 500;
    color: black;
}
.btns :deep(svg){
    margin: 0 .5em;
    stroke: var(--text-grey);
    stroke-width: .5;
}
</style>