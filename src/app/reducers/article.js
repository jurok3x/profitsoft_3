import ArticleActionTypes from "app/constants/articleActionTypes";
import Status from "app/constants/status";

const initialState = {
    articles: [],
    currentArticle: {},
    totalPages: 0,
    errors: [],
    status: Status.IDLE
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case ArticleActionTypes.ARTICLES_FIND_RESPONSE: {
            const response = action.payload;
            const { list:articles, totalPages } = response;
            return {
                ...state,
                articles,
                currentArticle: null,
                totalPages,
                status: Status.SUCCESS
            }
        }
        case ArticleActionTypes.ARTICLES_FIND_BY_ID_RESPONSE: {
            const response = action.payload;
            return {
                ...state,
                currentArticle: response,
                status: Status.SUCCESS
            }
        }
        case ArticleActionTypes.ARTICLES_SAVE: {
            const response = action.payload;
            const { id, title, author, year } = response;
            const article = {
                id,
                title,
                year,
                authorFullName:`${author?.firstName} ${author?.lastName}`
            }
            const updatedArticles = [article, ...state.articles];
            return {
                ...state,
                articles: updatedArticles,
                status: Status.SUCCESS
            }
        }
        case ArticleActionTypes.ARTICLES_DELETE: {
            const response = action.payload;
            const updatedArticles = state.articles.filter(article => article.id !== response.id);
            return {
                ...state,
                articles: updatedArticles,
                status: Status.SUCCESS
            };
        }

        case ArticleActionTypes.ARTICLES_UPDATE: {
            const response = action.payload;
            const updatedArticles = state.articles.map(article =>
                article.id === response.id ? response : article
            );
            return {
                ...state,
                articles: updatedArticles,
                currentArticle: response,
                status: Status.SUCCESS
            };
        }

        case ArticleActionTypes.ARTICLES_REQUEST: {
            return {
                ...state,
                status: Status.PENDING
            }
        }

        case ArticleActionTypes.ARTICLES_ERROR: {
            const response = action.payload;
            return {
                ...state,
                errors: response,
                status: Status.ERROR
            }
        }

        default: {
            return state;
        }
    }
}