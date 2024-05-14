import ArticleActionTypes from 'app/constants/articleActionTypes';
import config from 'config';
import { createArticle, deleteArticleById, findArticleById, searchArticles, updateArticleById } from 'misc/data/datasourse';
import axios from 'misc/requests';

const {
    ARTICLES_SERVICE,
} = config;

const fetchArticles = async (params) => {
    const { year, title, field } = params;
    const parameters = {
        ...params,
        page: params.page - 1,//BE has zero based paging
        year: year || null,
        title: title || null,
        field: field || null,
    }
    try {
        return await axios.post(`${ARTICLES_SERVICE}/_list`, parameters);
    } catch {
        return searchArticles(parameters);
    }
};

const writeArticle = async (article) => {
    try {
        return await axios.post(`${ARTICLES_SERVICE}`, article);
    } catch {
        return createArticle(article);
    }
};

const updateArticle = async ({ id, article }) => {
    try {
        return await axios.put(`${ARTICLES_SERVICE}/${id}`, article);
    } catch {
        return updateArticleById(id, article);
    }
};

const deleteArticle = async (id) => {
    try {
        return await axios.delete(`${ARTICLES_SERVICE}/${id}`);
    } catch {
        return deleteArticleById(id);
    }
};

const fetchArticleById = async (id) => {
    try {
        return await axios.get(`${ARTICLES_SERVICE}/${id}`);
    } catch {
        return findArticleById(id);
    }
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

const receiveSavedArticle = (article) => {
    return {
        payload: article,
        type: ArticleActionTypes.ARTICLES_SAVE,
    };
}

const receiveUpdatedArticle = (article) => {
    return {
        payload: article,
        type: ArticleActionTypes.ARTICLES_UPDATE,
    };
}

const receiveDeleteResponse = (article) => {
    return {
        payload: article,
        type: ArticleActionTypes.ARTICLES_DELETE,
    };
}

const articlesRequest = () => ({
    type: ArticleActionTypes.ARTICLES_REQUEST,
});

const handleError = (error) => {
    return {
        payload: [{message: 'Error fetching article'}],
        type: ArticleActionTypes.ARTICLES_ERROR,
    };
}

const findArticles = (params) => (dispatch) => {
    dispatch(articlesRequest());
    fetchArticles(params)
        .then((articles) => dispatch(receiveArticles(articles)))
        .catch((error) => dispatch(handleError(error)));
};

const findById = (id) => (dispatch) => {
    dispatch(articlesRequest());
    fetchArticleById(id)
        .then((article) => dispatch(receiveArticle(article)))
        .catch((error) => dispatch(handleError(error)));
};

const save = (article) => (dispatch) => {
    dispatch(articlesRequest());
    writeArticle(article)
        .then((article) => dispatch(receiveSavedArticle(article)))
        .catch((error) => dispatch(handleError(error)));
};

const deleteById = (id) => (dispatch) => {
    dispatch(articlesRequest());
    deleteArticle(id)
        .then((article) => dispatch(receiveDeleteResponse(article)))
        .catch((error) => dispatch(handleError(error)));
};

const updateById = ({ id, article }) => (dispatch) => {
    dispatch(articlesRequest());
    updateArticle({ id, article })
        .then((article) => dispatch(receiveUpdatedArticle(article)))
        .catch((error) => dispatch(handleError(error)));
};

const exportFunctions = {
    findArticles,
    findById,
    save,
    updateById,
    deleteById,
};

export default exportFunctions;