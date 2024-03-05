<template>
    <div class="row">
        <div class="left">
            <button v-if="props.back" class="back">&larr; Назад</button>
            <button v-if="props.save" class="save">Сохранить</button>
            <button v-if="props.reset" class="reset">
                <ResetIco width="18" height="18" /> Сброс к изначальным настройка
            </button>
            <button v-if="props.add" class="add">Добавить</button>
            <button v-if="props.cancel" class="cancel">Отмена</button>
            
        </div>
        <div class="right">
            <div v-if="props.toAll" class="to-all" style="display: inline-flex; margin: 1em;">
            <span style="margin-right: 1em;word-wrap: break-word;">Применить параметры к остальным раундам</span>
            <MySwitch v-model="saveForAll" />
        </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import MySwitch from '@/assets/MySwitch.vue';
import ResetIco from '@/assets/ResetIco.vue';
const props = defineProps<{
    back?: boolean
    save?: boolean
    reset?: boolean
    toAll?: boolean
    add?: boolean
    cancel?: boolean
    saveAndShow?: boolean
    edit?: boolean
    delete?: boolean
    download?: boolean
    share?: boolean
}>();
const saveForAll = ref(false);
</script>
<style scoped>
button {
    cursor: pointer;
    margin: 1em;
    border: none;
    outline: none;
    background: transparent;
    border-radius: 0.75em;
    padding: 0.7em 1em;
    font-size: 1.2em;
}
button:first-child{
    margin-left: 0;
}
button:last-child{
    margin-right: 0;
}
.back {
    color: var(--text-darker);
    border: 1.75px solid var(--text-darker);
    border-radius: 0.75em;
}
.save {
    color: var(--success);
    border: 1.75px solid var(--success);
}
.row {
    display: flex;
    flex-direction: row;
}
.left {
    /* background-color: aqua; */
    flex-grow: 2;
}
.right {
    text-align: right;
    flex-grow: 1;
    /* background-color: blueviolet; */
}
.add {
    border: 1px solid var(--success);
    color: var(--success);
    border-radius: 0.5em;
    padding: 1rem 2rem;
    background: white;
}
.cancel {
    background: white;
    border: 1px solid red;
    color: red;
    border-radius: 0.5em;
    padding: 1rem 2rem;
}
.reset{
    border: 1.75px solid var(--text-darker);
    border-radius: 0.75em;
}
</style>
