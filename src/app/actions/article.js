import ArticleActionTypes from 'app/constants/articleActionTypes';
import config from 'config';
import { findArticleById, searchArticles } from 'misc/data/datasourse';
import axios from 'misc/requests';

const search = (params) => {
    const parameters = {
        ...params,
        page: params.page - 1,
    }
    const {
        ARTICLES_SERVICE,
    } = config;
    return axios.post(`${ARTICLES_SERVICE}/_list`, parameters).catch(() => {
        return searchArticles(parameters);
    });
};

const getById = (id) => {
    const {
        ARTICLES_SERVICE,
    } = config;
    return axios.get(`${ARTICLES_SERVICE}/${id}`).catch(() => {
        return findArticleById(id);
    });
};

const receiveArticles = (articles) => {
    return {
        payload: articles,
        type: ArticleActionTypes.ARTICLES_FIND_RESPONSE,
    };
}

const receiveArticle = (article) => {
    return {
        payload: article,
        type: ArticleActionTypes.ARTICLES_FIND_BY_ID_RESPONSE,
    };
}

const requestArticles = () => ({
    type: ArticleActionTypes.ARTICLES_REQUEST,
});

const handleError = (error) => {
    return {
        payload: [{message: 'Error fetching article'}],
        type: ArticleActionTypes.ARTICLES_ERROR,
    };
}

const findArticles = (params) => (dispatch) => {
    dispatch(requestArticles());
    search(params)
        .then((articles) => dispatch(receiveArticles(articles)))
        .catch((error) => dispatch(handleError(error)));
};

const findById = (id) => (dispatch) => {
    dispatch(requestArticles());
    getById(id)
        .then((article) => dispatch(receiveArticle(article)))
        .catch((error) => dispatch(handleError(error)));
};

const exportFunctions = {
    findArticles,
    findById,
};

export default exportFunctions;