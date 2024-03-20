import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { config } from '@/config'
import type { INotification } from '@/components/base/NotificationComponent.vue'
import type { ICategory } from '@/components/question/CategoryFormComponent.vue'
export const CLEAN_GAME: IGame = {
    game_info: {
        name: '',
        theme: '',
        client: '',
        date: '1970-01-01'
    },
    game_settings: {
        tactics: {
            remove_answer: 0,
            one_for_all: 0,
            question_bet: 0,
            all_in: 0,
            team_bet: 0
        },
        skip_emails: false
    }
}
export const CLEAN_ROUND: IRound = {
    type: '',
    settings: {
        is_test: false,
        name: '',
        display_name: false,
        time_to_answer: 0,
        use_special_tactics: false
    }
}
export const CLEAN_QUESTION: IQuestion = {
    type: '',
    question: '',
    answers: [],
    correct_answer: '',
    time_to_answer: 0,
    media_data: {
        show_image: false,
        video: {
            before: '',
            after: ''
        },
        image: {
            before: '',
            after: '',
            player_displayed: false
        }
    },
    categories: []
}
interface IGame {
    isCommonFeatures?: boolean
    id?: number
    game_info: {
        name: string
        theme: string
        client: string
        date: string
    }
    game_settings: {
        tactics: {
            remove_answer: number
            one_for_all: number
            question_bet: number
            all_in: number
            team_bet: number
        }
        skip_emails: boolean
    }
    rounds?: IRound[]
}
export interface IRound {
    id?: number
    type: string
    settings: {
        is_test: boolean
        name: string
        display_name: boolean
        time_to_answer: number
        use_special_tactics: boolean
        remove_answer?: number
        one_for_all?: number
        question_bet?: number
        all_in?: number
        team_bet?: number
    }
    questions?: IQuestion[]
}
export interface IMedia {
    id?: number
    show_image: boolean
    video: {
        before: string
        after: string
    }
    image: {
        before: string
        after: string
        player_displayed: boolean
    }
}
/** TODO:
 * 1. Сделать мини-questions для get-question-names
 * 2. Выпилить any  */
export interface IQuestion {
    id?: number
    type?: string
    question: string
    answers?: string[]
    correct_answer?: string
    time_to_answer?: number
    media_data?: IMedia
    categories: ICategory[]
}
export interface BIGame {
    id: number
    name: string
    theme: string
    client: string
    date: string
    remove_answer: number
    one_for_all: number
    question_bet: number
    all_in: number
    team_bet: number
    skip_emails: boolean
    rounds: BIRound[]
}
export interface BIGameLite {
    id: number
    name: string
    theme: string
    date: string
}
export interface BIRound {
    id: number
    game_id: number
    round_type: string
    is_test: boolean
    name: string
    display_name: boolean
    time_to_answer: number
    use_special_tactics: boolean
    questions?: BIQuestion[] | any
}
export interface BIQuestion {
    id: number
    question_type: string
    question_text: string
    show_image: boolean
    image_before: string
    image_after: string
    video_before: string
    time_to_answer: number
    correct_answer: string
    answers: string
    player_display: boolean
    categories?: string
}
export const useGameStore = defineStore('game', () => {
    const currentGame = ref<IGame>(CLEAN_GAME)
    const allGames = ref<IGame[]>()
    const allRoundsInCurrentGame = ref<IRound[]>()
    const currentRound = ref<IRound>(CLEAN_ROUND)
    const currentQuestion = ref<IQuestion>(CLEAN_QUESTION)
    const allQuestionsInCurrentRound = ref<IQuestion[]>([])
    const globalNotification = ref<INotification>({
        isFixed: false,
        type: '',
        message: '',
        clear: () => {
            globalNotification.value.message = ''
            globalNotification.value.type = ''
            globalNotification.value.isFixed = false
        }
    })
    const getGamesNames = async () => {
        axios
            .get(config.urls.get.all.games)
            .then(function (res) {
                if (res.status === 200 && res.data.length > 0) {
                    allGames.value = mapBILiteGameToIGame(res.data)
                    globalNotification.value.clear()
                } else {
                    return null
                }
            })
            .catch(function (error) {
                globalNotification.value.message = error.message
                globalNotification.value.type = 'error'
                setTimeout(() => getGamesNames(), 1500)
            })
    }
    const getGame = async (_id: number) => {
        axios
            .get(config.urls.get.game + _id + '/')
            .then(function (res) {
                if (res.status === 200) {
                    currentGame.value = mapBIGameToIGame(res.data)
                } else {
                    return null
                }
            })
            .catch(function (error) {
                globalNotification.value.message = error.message
                globalNotification.value.type = 'error'
                setTimeout(() => getGame(_id), 1500)
            })
    }
    const createGame = async () => {
        const prepared = {
            game: {
                ...currentGame.value
            }
        }
        axios
            .post(config.urls.create.game, prepared)
            .then(function (res) {
                if (res.status === 200 || res.status === 201) {
                    globalNotification.value.message =
                        'Игра успешно ' + prepared.game.game_info.name + ' создана'
                    globalNotification.value.type = 'success'
                    return true
                } else {
                    return null
                }
            })
            .catch(function (error) {
                globalNotification.value.message = error.message
                globalNotification.value.type = 'error'
            })
    }
    const downloadGame = async (_id: number) => {
        axios
            .get(config.urls.download.json + _id + '/')
            .then(function (res) {
                if (res.status === 200 && res.data) {
                    downloadJSON(res.data)
                } else {
                    return null
                }
            })
            .catch(function (error) {
                globalNotification.value.message = error.message
                globalNotification.value.type = 'error'
            })
    }
    const deleteGame = async (_id: number) => {
        axios
            .delete(config.urls.delete.game + _id + '/')
            .then(function (res) {
                if (res.status < 300) {
                    globalNotification.value.message = 'Категория удалена'
                    globalNotification.value.type = 'success'
                    return true
                } else {
                    return null
                }
            })
            .catch(function (error) {
                globalNotification.value.message = error.message
                globalNotification.value.type = 'error'
            })
    }
    const setAnswersInsideQuestion = async (_answers: string[]) => {
        currentQuestion.value.answers = _answers
    }
    const setCorrectAnswer = async (_correct: string) => {
        currentQuestion.value.correct_answer = _correct
    }
    //TODO: в QCategories() => get: ()=>{}, set: ()=>{} отрефачить
    const setQuestionCategories = async (_categories: ICategory[]) => {
        currentQuestion.value.categories = _categories
    }
    const getBankQuestions = async(): IQuestion[] => {
        let result: IQuestion[]
        axios.get(config.urls.get.all.questions).then((res)=>{
            result = mapBIQuestionToIQuestions(res.data);
        }).catch((error)=>{
            globalNotification.value.message = error.message
            globalNotification.value.isFixed = true
            globalNotification.value.type = 'error'
            result = []
        });
        return result;
    }
    const getQuestionCategories = (): ICategory[]  => {
        return currentQuestion.value.categories
    }
    const addCategory = (clikedData: string, place: any) => {
        place.categories.push(clikedData)
    }
    const getCategories = (): ICategory[] =>{
        const categories: ICategory[] = []
        axios.get(config.urls.get.all.categories).then(function (res) {
            globalNotification.value.clear()
                res.data.map((item: ICategory)=>{
                 if (!categories.includes(item)) {
                     categories.push({
                         id: item.id,
                         name: item.name
                     });
                 }
                })
            }
        ).catch((error)=>{
            console.error(error);
            globalNotification.value.message = error.message
            globalNotification.value.type = 'error'
            setTimeout(getCategories, 2000)
        });
        return categories;
    }
    const setCategories = ()=>{
        currentQuestion.value.categories = getCategories();
    }
    const clearGame = () => {
        currentGame.value = CLEAN_GAME
    }
    const clearRound = () => {
        currentRound.value = CLEAN_ROUND
    }
    const clearQuestion = () => {
        currentQuestion.value = CLEAN_QUESTION
    }
    const addCurrentQuestionToCurrentRound = () => {
        currentRound.value.questions
            ? currentRound.value.questions.push({ ...currentQuestion.value })
            : (currentRound.value.questions = [{ ...currentQuestion.value }])
        clearQuestion()
    }

    function downloadJSON(data: any) {
        const jsonse = JSON.stringify(data)
        const blob = new Blob([jsonse], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'scenario.json' //`${data.name + '.json' ?? 'game.json'}`
        a.textContent = `Download ${a.download}`
        a.click()
        a.remove()
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
                    tactics: {
                        remove_answer: 0,
                        one_for_all: 0,
                        question_bet: 0,
                        all_in: 0,
                        team_bet: 0
                    },
                    skip_emails: false
                }
            }
        })
    }
    function mapBIGameToIGame(data: BIGame): IGame {
        return {
            id: data.id,
            game_info: {
                name: data.name,
                theme: data.theme,
                client: data.client,
                date: data.date
            },
            game_settings: {
                tactics: {
                    remove_answer: data.remove_answer,
                    one_for_all: data.one_for_all,
                    question_bet: data.question_bet,
                    all_in: data.all_in,
                    team_bet: data.team_bet
                },
                skip_emails: data.skip_emails
            },
            rounds: mapBIRoundToIRounds(data.rounds)
        }
    }
    function mapBIRoundToIRounds(data: BIRound[]): IRound[] {
        const result: IRound[] = []
        data.forEach((el, i) => {
            const temp: IRound = {
                id: data[i].id,
                type: data[i].round_type,
                settings: {
                    is_test: data[i].is_test,
                    name: data[i].name,
                    display_name: data[i].display_name,
                    time_to_answer: data[i].time_to_answer,
                    use_special_tactics: data[i].use_special_tactics
                },
                questions: mapBIQuestionToIQuestions(data[i].questions)
            }
            result.push(temp)
        })
        return result
    }
    function mapBIQuestionToIQuestions(data: BIQuestion[]): IQuestion[] {
        const result: IQuestion[] = []
        data.forEach((el) => {
            const temp: IQuestion = {
                id: el.id,
                type: el.question_type,
                question: el.question_text,
                answers: el.answers.split(',') /*TODO: Изменить сепоратор на ;*/,
                correct_answer: el.correct_answer,
                time_to_answer: el.time_to_answer,
                media_data: {
                    show_image: el.show_image,
                    video: {
                        before: el.video_before,
                        after: '' /*TODO: Сделать на беке*/
                    },
                    image: {
                        before: el.image_before,
                        after: el.image_after,
                        player_displayed: el.player_display
                    }
                },
                categories: getCategories()
            }
            result.push(temp)
        })
        return result
    }
    return {
        currentGame,
        globalNotification,
        getBankQuestions,
        getGamesNames,
        downloadGame,
        deleteGame,
        getGame,
        setAnswersInsideQuestion,
        setCorrectAnswer,
        clearGame,
        clearRound,
        clearQuestion,
        createGame,
        getQuestionCategories,
        getCategories,
        setCategories,
        allGames,
        allRoundsInCurrentGame,
        currentRound,
        currentQuestion,
        allQuestionsInCurrentRound,
        mapBIQuestionToIQuestions,
        addCurrentQuestionToCurrentRound
    }
})
