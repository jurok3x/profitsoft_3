import ArticleActionTypes from 'app/constants/articleActionTypes';
import articleApi from '../api/article-api';

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
    articleApi.fetchArticles(params)
        .then((articles) => dispatch(receiveArticles(articles)))
        .catch((error) => dispatch(handleError(error)));
};

const findById = (id) => (dispatch) => {
    dispatch(articlesRequest());
    articleApi.fetchArticleById(id)
        .then((article) => dispatch(receiveArticle(article)))
        .catch((error) => dispatch(handleError(error)));
};

const save = (article) => (dispatch) => {
    dispatch(articlesRequest());
    articleApi.writeArticle(article)
        .then((article) => dispatch(receiveSavedArticle(article)))
        .catch((error) => dispatch(handleError(error)));
};

const deleteById = (id) => (dispatch) => {
    dispatch(articlesRequest());
    articleApi.deleteArticle(id)
        .then((article) => dispatch(receiveDeleteResponse(article)))
        .catch((error) => dispatch(handleError(error)));
};

const updateById = ({ id, article }) => (dispatch) => {
    dispatch(articlesRequest());
    articleApi.updateArticle({ id, article })
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