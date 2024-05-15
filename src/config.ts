//const root = 'http://localhost:8000/api/v1'
const root = 'https://api.webmonkeys.ru/api/v1'

const config = {
    root,
    state: {
        companyName: 'Скородум'
    },
    urls: {
        create: {
            game: `${root}/create-game/`,
            round: `${root}/create-round/`,
            question: `${root}/create-question/`,
            category: `${root}/create-category/`
        },
        get: {
            game: `${root}/get-game/`,
            //round: `${root}/get-round/`,
            question: `${root}/get-question/`,
            category: `${root}/get-category/`,
            all: {
                games: `${root}/get-names-games/`,
                //rounds: `${root}/get-rounds/`,
                questions: `${root}/get-all-questions/`,
                categories: `${root}/get-categories/`
            }
        },
        update: {
            game: `${root}/update-game/`,
            round: `${root}/update-round/`,
            question: `${root}/update-question/`,
            category: `${root}/update-category/`
        },
        delete: {
            game: `${root}/delete-game/`,
            round: `${root}/delete-round/`,
            question: `${root}/delete-question/`,
            category: `${root}/delete-category/`
        },
        download: {
            questions: `${root}/questions-in-word/`,
            json: `${root}/download-game-to-json/`,
            word: `${root}/download-game-to-word/`,
            a: `${root}/download/`
        },
        upload: {
            a: `${root}/upload-file/`,
            b: `${root}/upload-file2/`,
            c: `${root}/upload/`
        },
        search: {
            categories: `${root}/search-categories/`,
            question: `${root}/question-search/`,
        }
    }
}

export { config }
