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

const articleApi = {
    fetchArticleById,
    deleteArticle,
    updateArticle,
    fetchArticles,
    writeArticle,
};

export default articleApi;