import ArticleActionTypes from 'app/constants/articleActionTypes';
import config from 'config';
import { searchArticles } from 'misc/data/datasourse';
import axios from 'misc/requests';

const search = (params) => {
    const parameters = {
        ...params,
        page: params.page - 1,
    }
    console.log(JSON.stringify(params))
    const {
        ARTICLES_SERVICE,
    } = config;
    return axios.post(`${ARTICLES_SERVICE}/_list`, parameters).catch(() => {
        return searchArticles(parameters);
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

const findArticles = (params) => (dispatch) => {
    dispatch(requestArticles());
    search(params)
        .then((articles) => dispatch(receiveArticles(articles)))
        .catch((error) => dispatch(handleError(error)));
};

const exportFunctions = {
    findArticles,
};

export default exportFunctions;