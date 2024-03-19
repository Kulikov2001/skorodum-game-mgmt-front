<template>
    <div class="form__wrapper">
        <div class="form__game">
            <div class="row">
                <div class="field game-name">
                    <div class="field-elem">
                        <input
                            style="padding-left: 0"
                            class="text-field game-name"
                            type="text"
                            placeholder="Название игры"
                            v-model="gameName"
                        />
                    </div>
                </div>
                <div class="field client">
                    <div class="field-elem client-first">
                        <label for="client_name">Заказчик: </label>
                    </div>
                    <div class="field-elem client-last">
                        <input
                            id="client_name"
                            class="text-field"
                            type="text"
                            placeholder="Наименование"
                            v-model="clientName"
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
                            v-model="date"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row btns">
            <div class="field">
                <MySwitch v-model="isPlayersName" />
                <label for="isPlayersName">Имена членов команд</label>
            </div>
            <div class="field">
                <MySwitch v-model="isPlayersEmail" />
                <label for="isPlayersEmail">E-mail членов команд</label>
            </div>
            <div class="field">
                <MySwitch v-model="isTableNumber" />
                <label for="isTableNumber">Номер стола</label>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import MySwitch from '@/assets/MySwitch.vue'
import { useGameStore } from '@/stores/game'
const store = useGameStore()
const isPlayersName = ref(false)
const isPlayersEmail = ref(false)
const isTableNumber = ref(false)

const gameName = computed({
    get: () => {
        return store.currentGame.game_info.name ?? ''
    },
    set: (val: string) => {
        store.currentGame.game_info.name = val
    }
})
const clientName = computed({
    get: () => {
        return store.currentGame.game_info.client ?? ''
    },
    set: (val: string) => {
        store.currentGame.game_info.client = val
    }
})
const date = computed({
    get: () => {
        return store.currentGame.game_info.date ?? ''
    },
    set: (val: string) => {
        store.currentGame.game_info.date = val
    }
})
</script>
<style scoped>
label {
    font-weight: 700;
    color: var(--text-darker);
}
:root {
    --form-border-color: var(--text-grey);
    --form-border-width: 1px;
}
.form__wrapper {
    margin-top: 2em;
    padding: 0 2em 2em 2em;
    border: 1px solid var(--text-grey);
    border-radius: 1.5em;
}
.btns .field {
    display: inline-flex;
    margin: 0.5em;
    align-items: center;
}
.btns .field label {
    margin: 0.5em;
}
.text-field.game-name::placeholder {
    text-transform: uppercase;
    font-weight: 700;
    color: var(--text-grey);
    opacity: 0.9;
}
.text-field.game-name {
    padding: 0.25em;
    font-size: 1.2em;
}
.field.game-name {
    flex-grow: 1;
    border-bottom: 1px solid var(--text-grey);
}

.field.date {
    border-bottom: 1px solid var(--text-grey);
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
.field.client {
    border-bottom: 1px solid var(--text-grey);
}
.field.client .client-first {
    border-left: 1px solid var(--text-grey) !important;
}
.field.client .client-last {
    border-right: 1px solid var(--text-grey) !important;
}
@media screen and (min-width: 960px) {
    .row {
        flex-direction: row;
    }
    .client,
    .date,
    .game-name {
        padding: 1em;
        border-bottom: 1px solid var(--text-darker);
    }
    .field-elem {
        padding: 1em;
        display: inline-block;
        max-height: 4em;
        min-height: 4em;
    }
}
@media screen and (max-width: 960px) {
    .form__wrapper {
        .client,
        .date,
        .game-name {
            padding: 1em;
            /*border-bottom: 1px solid var(--text-darker);*/
        }
        .client-first,
        .client-last {
            border: none !important;
        }
        input {
            width: 100%;
        }
    }
    /* .field.client {
			 display: grid;
			 grid-template-columns: 2fr 10fr;
			 label {
				 margin-right: 1em;
			 }
		 }
	 }
	 .field-elem .client .date {
	 //    padding: 1em !important;
	 }*/
}
</style>
