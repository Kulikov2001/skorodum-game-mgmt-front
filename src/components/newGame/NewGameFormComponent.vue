<template>
    <div class="form__wrapper">
        <div class="form__game">
            <div class="row">
                <div class="field game-name">
                    <div class="field-elem">
                        <input
                            style="padding-left: 0"
                            class="text-field"
                            type="text"
                            placeholder="Название игры"
                        />
                    </div>
                </div>
                <div class="field zakaz">
                    <div class="field-elem" style="border-left: 2px solid var(--text-darker)">
                        <label for="zakazchik">Заказчик: </label>
                    </div>
                    <div class="field-elem" style="border-right: 2px solid var(--text-darker)">
                        <input
                            id="zakazchik"
                            class="text-field"
                            type="text"
                            placeholder="Наименование"
                        />
                    </div>
                </div>
                <div class="field date">
                    <div class="field-elem">
                        <label for="game-date">Дата: </label>
                    </div>
                    <div class="field-elem">
                        <input
                            style="padding-right: 0"
                            id="game-date"
                            class="text-field"
                            type="date"
                            placeholder="ДД/ММ/ГГГГ"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row btns">
            <div class="field">
                <MySwitch v-model="isPlayersName"/>
                <label for="isPlayersName">Имена членов команд</label>
            </div>
            <div class="field">
                <MySwitch v-model="isPlayersEmail"/>
                <label for="isPlayersEmail">E-mail членов команд</label>
            </div>
            <div class="field">
                <MySwitch v-model="isTableNumber"/>
                <label for="isTableNumber">Номер стола</label>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MySwitch from '@/assets/MySwitch.vue'
import {useGameStore} from '@/stores/game.ts';
const gameStore = useGameStore();
const isPlayersName = ref(false);
const isPlayersEmail = ref(false);
const isTableNumber = ref(false);


</script>
<style scoped>
.form__wrapper {
    margin-top: 2em;
    padding: 0 2em 2em 2em;
    border: 2px solid var(--text-darker);
    border-radius: 1.5em;
}
.btns .field{
    display: inline-flex;
    margin: .5em;
    align-items: center;
}
.btns .field label{
    margin: .5em;
}
.field.game-name{
    flex-grow: 1;
    border-bottom: 2px solid var(--text-darker);
}
.field.zakaz{
    border-bottom: 2px solid var(--text-darker);
}
.field.date{
    border-bottom: 2px solid var(--text-darker);
}
.field-elem > input {
    border: 0;
}
.field > label {
    font-weight: 500;
}
.row {
    display: flex;
    flex-direction: column;
}
.field,
.my-switch,
label {
    vertical-align: center;
}
.my-switch {
    display: inline;
}
@media screen and (min-width: 900px) {
    .row {
        flex-direction: row;
    }
    .field-elem {
        padding: 1em;
        display: inline-block;
        max-height: 4em;
        min-height: 4em;
    }
}
@media screen and (max-width: 500px) {
    .form__wrapper{
        .zakaz, .date, .game-name{
            padding: 1em;
            border-bottom: 1px solid var(--text-darker);
        }
        .field-elem{
            border: 0 !important;
        }
        .field.zakaz{
            display: grid;
            grid-template-columns: 2fr 10fr;
            label{
                margin-right: 1em;
            }
        }
    }
}
</style>
