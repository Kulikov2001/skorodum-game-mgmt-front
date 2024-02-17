<template>
    <div class="form__wrapper">
        <div class="form__game">
            <div class="row">
                <div class="field">
                    <div class="field-elem">
                        <input
                            style="padding-left: 0"
                            class="text-field"
                            type="text"
                            placeholder="Название игры"
                        />
                    </div>
                </div>
                <div class="field">
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
                <div class="field">
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
        <div class="row">
            <div class="field">
                <vs-switch id="isPlayersName" />
                <label for="isPlayersName">Имена членов команд</label>
            </div>
            <div class="field">
                <vs-switch id="isPlayersEmail" />
                <label for="isPlayersEmail">E-mail членов команд</label>
            </div>
            <div class="field">
                <vs-switch id="isTableNumber" />
                <label for="isTableNumber">Номер стола</label>
            </div>
        </div>
    </div>
</template>
<style>
.form__wrapper {
    margin-top: 2em;
    padding: 0 2em 2em 2em;
    border: 2px solid var(--text-darker);
    border-radius: 1.5em;
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
.vs-switch,
label {
    vertical-align: center;
}
.vs-switch {
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
        border-bottom: 2px solid var(--text-darker);
    }
}
</style>
