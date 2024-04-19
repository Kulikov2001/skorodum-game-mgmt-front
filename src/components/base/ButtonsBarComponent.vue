<template>
    <div class="row">
        <div class="left">
            <button v-if="props.back" @click="emit('Back')" class="back">&larr; Назад</button>
            <button v-if="props.save" @click="emit('Save')" class="save">Сохранить</button>
            <button v-if="props.reset" @click="emit('Reset')" class="reset">
                <ResetIco width="18" height="18" /> Сброс к изначальным настройка
            </button>
            <button v-if="props.add" @click="emit('Add')" class="add">Добавить</button>
            <button v-if="props.cancel" @click="emit('Cancel')" class="cancel">Отмена</button>
        </div>
        <div class="right">
            <div v-if="props.toAll" class="to-all" style="display: inline-flex; margin: 1em">
                <span style="margin-right: 1em; word-wrap: break-word"
                    >Применить параметры к остальным раундам</span
                >
                <MySwitch v-model="saveForAll" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MySwitch from '@/assets/MySwitch.vue'
import ResetIco from '@/assets/ResetIco.vue'
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
}>()
const emit = defineEmits<{
    (e: 'Back'): void
    (e: 'Save'): void
    (e: 'Reset'): void
    (e: 'ToAll'): void
    (e: 'Add'): void
    (e: 'Cancel'): void
    (e: 'SaveAndShow'): void
    (e: 'Edit'): void
    (e: 'Delete'): void
    (e: 'Download'): void
    (e: 'Share'): void
}>()
const saveForAll = ref(true)
</script>
<style scoped>
.row {
    margin-top: 1.5em;
}
button {
    cursor: pointer;
    margin: auto 1em;
    border: none;
    outline: none;
    background: transparent;
    border-radius: 0.5em;
    padding: 1em 2em;
    font-size: 1.2em;
}
button:first-child {
    margin-left: 0;
}
button:last-child {
    margin-right: 0;
}
button:nth-child(even) {
    margin-left: 0;
}
.back {
    color: #566bac;
    border: 1.75px solid #566bac;
    border-radius: 0.75em;
    padding: 1em 2.8em 1em 2em;
}
.save {
    color: var(--success);
    border: 1.75px solid var(--success);
}
.row {
    display: flex;
    flex-direction: row;
}
@media screen and (max-width: 700px){
    .row{
        flex-direction: column;
        gap: 30px;
        justify-content: center;
        align-items: center;
    }
    .row button{
        margin: .5em;
    }
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
.reset {
    border: 1.75px solid var(--text-darker);
    border-radius: 0.75em;
}
</style>
