import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import {config} from '@/config'
interface IGame {
    isCommonFeatures?: boolean,
    id?: number,
    game_info: {
        name: string,
        theme: string,
        client: string,
        date: string
    },
    game_settings:{
        tacticts:{
            remove_answers: number,
            one_for_all: number,
            question_bet: number,
            all_in: number,
            team_bet: number
        },
        skip_emails: boolean
    }
    rounds?: object[],


};
interface IRound{
    id?: number,
    type: string,
    settings: {
        is_test: boolean,
        name: string,
        display_name: boolean,
        time_to_answer: number,
        use_special_tactics: boolean,
        remove_answer?: number,
        one_for_all?:number,
        question_bet?: number,
        all_in?: number,
        team_bet?: number
    },
    questions?: IQuestion
};
export interface IMedia {
    id?: number,
    show_image: boolean,
    video:{
        before: string,
        after: string
    },
    image:{
        before: string,
        after: string,
        player_displayed: boolean
    }
}
interface IQuestion{
    id?: number,
    type: string,
    question: string,
    answers: string[],
    correct_answer: string,
    time_to_answer: number,
    media_data: IMedia,
    categories?: object[]
}
export interface BIGame{
    id: number,
    name: string,
    theme: string,
    client: string,
    date: string,
    remove_answer: number,
    one_for_all: number,
    question_bet: number,
    all_in:number,
    team_bet: number,
    skip_emails: boolean,
    rounds: object[]
}
export interface BIGameLite{
    id:number,
    name: string,
    theme:string,
    date: string
}
export interface BIRound{
    id: number,
    question_set: string[];
    regular_round: boolean,
    trial_round: boolean,
    blitz: boolean,
    remove_wrong_answer: number,
    bet_on: number,
    one_for_all: number,
    all_in: number,
    points_on_barrel: number,
    multiplier: number,
    response_time: number,
    game_id: number,
}
export const useGameStore = defineStore('game', () => {
    const currentGame = ref<IGame>(    {
        game_info: {
        name: '',
        theme: '',
        client: '',
        date: '1970-01-01'
    },
    game_settings:{
        tacticts:{
            remove_answers: 0,
            one_for_all: 0,
            question_bet: 0,
            all_in: 0,
            team_bet: 0
        },
        skip_emails: false
    }});
    const allGames = ref<IGame[]>();
    const allRoundsInCurrentGame = ref<IRound[]>();
    const currentRound = ref<IRound>({
        type: '',
        settings: {
            is_test: false,
            name: '',
            display_name: false,
            time_to_answer: 0,
            use_special_tactics: false,
        },  
        });
    const currentQuestion = ref<IQuestion>({
        type: '',
        question: '',
        answers: [],
        correct_answer: '',
        time_to_answer: 0,
        media_data: {
            show_image: false,
            video:{
                before: '',
                after: ''
            },
            image:{
                before: '',
                after: '',
                player_displayed: false
            }
        }
    });
    const allQuestionsInCurrentRound = ref<IQuestion[]>();

    const getGamesNames = async() =>{
        const res = await axios.get(config.urls.get.all.games);
        if (res.status === 200 && res.data.length > 0){
            allGames.value = await mapBILiteGameToIGame(res.data);
        }
        else{
            return null;
        }
    }
    const getGame = async(_id: number) =>{
        const res = await axios.get(config.urls.get.game + _id + '/');
        if (res.status === 200){
            currentGame.value = await mapBIGameToIGame(res.data);
        }
        else{
            return null;
        }
    }
    
    const downloadGame = async(_id: number) =>{
        const res = await axios.get(config.urls.download.json + _id + '/');
        if (res.status === 200 && res.data){
            downloadJSON(res.data);
        }
        else{
            return null;
        }
    }
    const deleteGame = async(_id: number) =>{
        const res = await axios.delete(config.urls.delete.game + _id + '/');
        if (res.status < 300){
            return true;
        }
        else{
            return null;
        }
    }

    function downloadJSON(data: object){
        const jsonse = JSON.stringify(data);
        const blob = new Blob([jsonse], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.name + '.json' ?? 'game.json'}`;
        a.textContent = `Download ${a.download}`;
        a.click();
        a.remove();
    }
    function mapBILiteGameToIGame(data: BIGameLite[]): IGame[] {
        return data.map((item) => {
            return {
                id: item.id,
                game_info: {
                    name: item.name,
                    theme: item.theme,
                    client: '',
                    date: item.date
                },
                game_settings: {
                    tacticts: {
                        remove_answers: 0,
                        one_for_all: 0,
                        question_bet: 0,
                        all_in: 0,
                        team_bet: 0
                    },
                    skip_emails: false
                }
            };
        });
    }
    function mapBIGameToIGame(data: BIGame): IGame {
        return {
            id: data.id,
            game_info:{
                name: data.name,
                theme: data.theme,
                client: data.client,
                date: data.date
            },
            game_settings:{
                tacticts:{
                    remove_answers: data.remove_answer,
                    one_for_all: data.one_for_all,
                    question_bet: data.question_bet,
                    all_in: data.all_in,
                    team_bet: data.team_bet
                },
                skip_emails: data.skip_emails
            },
            rounds: data.rounds ?? {}
        }
    }

    return {
        currentGame,
        getGamesNames,
        downloadGame,
        deleteGame,
        getGame,
        allGames,
        allRoundsInCurrentGame,
        currentRound,
        currentQuestion,
        allQuestionsInCurrentRound,
    }
})
