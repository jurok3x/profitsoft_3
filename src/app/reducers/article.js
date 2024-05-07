import ArticleActionTypes from "app/constants/articleActionTypes";
import Status from "app/constants/status";

const initialState = {
    articles: [],
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
                totalPages,
                status: Status.SUCCESS
            }
        }
        case ArticleActionTypes.ARTICLES_FIND_REQUEST: {
            return {
                ...state,
                status: Status.PENDING
            }
        }

        default: {
            return state;
        }
    }
}