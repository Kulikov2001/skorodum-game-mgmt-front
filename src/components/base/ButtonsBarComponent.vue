<template>
    <div class="row">
        <div class="left">
            <button v-if="props.back" class="back">&larr; Назад</button>
            <button v-if="props.save" class="save">Сохранить</button>
            <button v-if="props.reset" class="back">
                <img src="" alt="" />Сброс к изначальным настройка
            </button>
        </div>
        <div class="right">
            
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    back?: boolean,
    save?: boolean,
    reset?: boolean,
    toAll?: boolean,
    add?: boolean,
    cancel?: boolean,
    saveAndShow?: boolean,
    edit?: boolean,
    delete?: boolean,
    download?: boolean,
    share?: boolean,
}>();
</script>
<style scoped>
button {
    border: none;
    outline: none;
    background: transparent;
    border-radius: 0.75em;
    padding: 0.7em 1em;
    font-size: 1.2em;
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
</style>
