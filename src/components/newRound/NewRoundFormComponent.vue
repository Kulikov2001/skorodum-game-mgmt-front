<template>
    <div class="round__wrapper">
        <div class="form">
            <div class="row">
                <div class="subrow">
                    <InputComponent
                        style="
                            border-radius: 0;
                            border: 0;
                            border-bottom: 1px solid var(--text-darker);
                            width: 90%;
                            margin: 0 auto;
                        "
                        v-model="roundName"
                        placeholder="Название или номер раунда"
                    />
                    <div class="radio__wrapper">
                        <RadioGroup :data="{ ...radiobtns }" v-model="roundType" />
                    </div>
                </div>
            </div>
            <div class="row"></div>
        </div>
        <div class="features">
            <FeatureComponent
                :title="'Убрать неверный ответ'"
                :max="10"
                :min="0"
                :default="0"
                :desc="'Сколько раз за 1 раунд можно использовать'"
                :increase="1"
                v-model="remove_answer"
            />
            <FeatureComponent
                :title="'Ставлю на...'"
                :max="10"
                :min="0"
                :default="0"
                :desc="'Сколько раз за 1 раунд можно использовать'"
                :increase="1"
                v-model="question_bet"
            />
            <FeatureComponent
                :title="'Один за всех'"
                :max="10"
                :min="0"
                :default="0"
                :desc="'Сколько раз за 1 раунд можно использовать'"
                :increase="1"
                v-model="one_for_all"
            />
            <FeatureComponent
                :title="'Ва-банк'"
                :max="10"
                :min="0"
                :default="0"
                :desc="'Сколько раз за 1 раунд можно использовать'"
                :increase="1"
                v-model="all_in"
            />
            <FeatureComponent
                :title="'Баллы на бочку'"
                :max="10"
                :min="0"
                :default="0"
                :desc="'Сколько раз за 1 раунд можно использовать'"
                :increase="1"
                v-model="team_bet"
            />
            <FeatureComponent
                :title="'Время на ответ'"
                :max="500"
                :min="0"
                :default="40"
                :desc="'Сколько раз за 1 раунд можно использовать'"
                :increase="5"
                :ico="'time'"
                v-model="time_to_answer"
            />
        </div>
    </div>
</template>

<style scoped>
.radio__wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 1em 2em;
}
:deep(.myradio) {
    margin-left: 2em;
    margin-right: 2em;
}
.round__wrapper {
    background-color: var(--background);
    padding: 2em;
}
.subrow {
    border: 1px solid var(--text-darker);
    border-radius: 1em;
    background: white;
}
@media screen and (max-width: 700px) {
    .round__wrapper{
      .radio__wrapper{
        display:inline-block;
        margin: .5em;
      }
      :deep(.wrapper.myradio){
        margin:.5em;
      }
    }
}
</style>
<script setup lang="ts">
import RadioGroup from '@/components/base/RadioGroup.vue'
import FeatureComponent from '@/components/newRound/FeatureComponent.vue'
import InputComponent from '@/components/base/InputComponent.vue'
import { computed, ref } from 'vue'
import {useGameStore} from '@/stores/game';

const gameStore = useGameStore();

const remove_answer = computed({
    get: () => {
        if (gameStore.currentGame && !gameStore.currentGame.isCommonFeatures && gameStore.currentRound.settings.remove_answer){
            return gameStore.currentRound.settings.remove_answer ?? 0
        }else {
            return gameStore.currentGame.game_settings.tacticts.remove_answers ?? 0;
        }
    },
    set: (val: number) => {
        if (gameStore.currentGame && !gameStore.currentGame.isCommonFeatures && gameStore.currentRound.settings.remove_answer){
            gameStore.currentRound.settings.remove_answer = val;
        }else {
            gameStore.currentGame.game_settings.tacticts.remove_answers = val;
        }
    }
});
const one_for_all = computed({
    get: () => {
        if (gameStore.currentGame && !gameStore.currentGame.isCommonFeatures && gameStore.currentRound.settings.one_for_all){
            return gameStore.currentRound.settings.one_for_all ?? 0
        }else {
            return gameStore.currentGame.game_settings.tacticts.one_for_all ?? 0;
        }
    },
    set: (val: number) => {
        if (gameStore.currentGame && !gameStore.currentGame.isCommonFeatures && gameStore.currentRound.settings.one_for_all){
            gameStore.currentRound.settings.one_for_all = val;
        }else {
            gameStore.currentGame.game_settings.tacticts.one_for_all = val;
        }
    }
});
const question_bet = computed({
    get: () => {
        if (gameStore.currentGame && !gameStore.currentGame.isCommonFeatures && gameStore.currentRound.settings.question_bet){
            return gameStore.currentRound.settings.question_bet ?? 0
        }else {
            return gameStore.currentGame.game_settings.tacticts.question_bet ?? 0;
        }
    },
    set: (val: number) => {
        if (gameStore.currentGame && !gameStore.currentGame.isCommonFeatures && gameStore.currentRound.settings.question_bet){
            gameStore.currentRound.settings.question_bet = val;
        }else {
            gameStore.currentGame.game_settings.tacticts.question_bet = val;
        }
    }
});
const all_in = computed({
    get: () => {
        if (gameStore.currentGame && !gameStore.currentGame.isCommonFeatures && gameStore.currentRound.settings.all_in){
            return gameStore.currentRound.settings.all_in ?? 0
        }else {
            return gameStore.currentGame.game_settings.tacticts.all_in ?? 0;
        }
    },
    set: (val: number) => {
        if (gameStore.currentGame && !gameStore.currentGame.isCommonFeatures && gameStore.currentRound.settings.all_in){
            gameStore.currentRound.settings.all_in = val;
        }else {
            gameStore.currentGame.game_settings.tacticts.all_in = val;
        }
    }
});
const team_bet = computed({
    get: () => {
        if (gameStore.currentGame && !gameStore.currentGame.isCommonFeatures && gameStore.currentRound.settings.team_bet){
            return gameStore.currentRound.settings.team_bet ?? 0
        }else {
            return gameStore.currentGame.game_settings.tacticts.team_bet ?? 0;
        }
    },
    set: (val: number) => {
        if (gameStore.currentGame && !gameStore.currentGame.isCommonFeatures && gameStore.currentRound.settings.team_bet){
            gameStore.currentRound.settings.team_bet = val;
        }else {
            gameStore.currentGame.game_settings.tacticts.team_bet = val;
        }
    }
});
const time_to_answer = computed({
    get: () => {
        return gameStore.currentRound.settings.time_to_answer ?? 40;
    },
    set: (val: number) => {
        if (typeof val === 'number' && val >= 2){
            gameStore.currentRound.settings.time_to_answer = val;
        }
    }
});
const roundName = computed({
	get: () => {
		return gameStore.currentRound.settings.name ?? '';
	},
	set: (value: string) => {
			gameStore.currentRound.settings.name = value;
		}
	});
const radiobtns = [
    {
        val: 'classical',
        label: 'Обычный раунд — идёт в зачёт'
    },
    {
        val: 'test',
        label: 'Пробный раунд — вне в зачёта'
    },
    {
        val: 'blitz',
        label: 'Блиц'
    }
]
const roundType = computed({
	get: () => {
		return gameStore.currentRound.type ?? 'classical';
	},
	set: (value: string) => {
			gameStore.currentRound.type = value;
		}
	});

// const allFeatures = [
//     {
//         tactic: 'remove_answer',
//         title: 'Убрать неверный ответ',
//         increase: 1,
//         default: 1,
//         min: 0,
//         max: 10,
//         desc: 'Сколько раз за 1 раунд можно использовать',
//         ico: null
//     },
//     {
//         tactic: 'question_bet',
//         title: 'Ставлю на...',
//         increase: 1,
//         default: 0,
//         min: 0,
//         max: 10,
//         desc: 'Сколько раз за 1 раунд можно использовать',
//         ico: null
//     },
//     {
        
//         tactic: 'one_for_all',
//         title: 'Один за всех',
//         increase: 1,
//         default: 0,
//         min: 0,
//         max: 10,
//         desc: 'Сколько раз за 1 раунд можно использовать',
//         ico: null
//     },
//     {
//         tactic: 'all_in',
//         title: 'Ва-банк',
//         increase: 1,
//         default: 0,
//         min: 0,
//         max: 10,
//         desc: 'Сколько раз за 1 раунд можно использовать',
//         ico: null
//     },
//     {
//         tactic: 'team_bet',
//         title: 'Баллы на бочку',
//         increase: 1,
//         default: 0,
//         min: 0,
//         max: 10,
//         desc: 'Сколько раз за 1 раунд можно использовать',
//         ico: null
//     },
//     {
//         title: 'Множитель',
//         increase: 1,
//         default: 3,
//         min: 0,
//         max: 10,
//         desc: 'Сколько раз за 1 раунд можно использовать',
//         ico: null
//     },
//     {
//         tactic:'time',
//         title: 'Время на ответ',
//         increase: 1,
//         default: 0,
//         min: 0,
//         max: 10,
//         desc: null,
//         ico: null
//     }
// ];

</script>
