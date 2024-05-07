import ArticleActionTypes from 'app/constants/articleActionTypes';
import config from 'config';
import { searchArticles } from 'misc/data/datasourse';
import axios from 'misc/requests';

const search = ({ page, size, params }) => {
    const {
        ARTICLES_SERVICE,
    } = config;
    return axios.post(`${ARTICLES_SERVICE}/_list`, {
        ...params,
        page: page - 1,
        size,
    }).catch(() => {
        return searchArticles({
            ...params,
            page: page - 1,
            size,
        });
    });
};

const receiveArticles = (articles) => {
    return {
        payload: articles,
        type: ArticleActionTypes.ARTICLES_FIND_RESPONSE,
    };
}

const requestArticles = () => ({
    type: ArticleActionTypes.ARTICLES_FIND_REQUEST,
});

const handleError = (error) => {
    return {
        payload: error,
        type: ArticleActionTypes.ERROR,
    };
}

const findArticles = ({ page = 1, size = 10, params } = {}) => (dispatch) => {
    dispatch(requestArticles());
    search({ page, size, params })
        .then((articles) => dispatch(receiveArticles(articles)))
        .catch((error) => dispatch(handleError(error)));
};

const exportFunctions = {
    findArticles,
};

export default exportFunctions;