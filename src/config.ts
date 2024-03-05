const root = 'http://localhost:8000/api/v1';

const config = {
	root,
	state: {
		companyName: 'Скородум'
	},
	urls: {
        create:{
            game: `${root}/create-game/`,
            round: `${root}/create-round/`,
            question: `${root}/create-question/`,
            category: `${root}/create-categories/create/`,
        },
        get:{
            game: `${root}/get-game/`,
            round: `${root}/get-round/`,
            question: `${root}/get-question/`,
            all:{
                games: `${root}/get-names-games/`,
                rounds: `${root}/get-rounds/`,
                questions: `${root}/get-questions/`,
                categories: `${root}/get-categories/`,
            }
        },
        update:{
            game: `${root}/update-game/`,
            round: `${root}/update-round/`,
            question: `${root}/update-question/`,
            category: `${root}/update-category/`,
    },
        delete:{
            game: `${root}/delete-game/`,
            round: `${root}/delete-round/`,
            question: `${root}/delete-question/`,
            category: `${root}/delete-category/`,
        },
        download: {
            json: `${root}/download-game-to-json/`,
            word: `${root}/download-game-to-word/`
        }
    }
};

export { config };