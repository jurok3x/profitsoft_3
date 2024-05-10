import jsonData from './data.json';

class DataSource {
    constructor() {
        this.articles = JSON.parse(JSON.stringify(jsonData));
    }

    findArticleById(id) {
        const article = this.articles.find(article => article.id === id);
        if(article) {
            return article;
        } else {
            console.log(`throwing error`)
            throw new Error("Article not found");
        }
    }

    deleteArticleById(id) {
        const articleToDelete = this.findArticleById(id);
        if (articleToDelete) {
            this.articles = this.articles.filter(article => article.id !== id);
            return "Article deleted";
        } else {
            throw new Error("Article not found");
        }
    }

    createArticle(newArticle) {
        this.articles.push(newArticle);
    }

    updateArticleById(id, updatedArticle) {
        const articleToUpdate = this.findArticleById(id);
        if(!articleToUpdate) {
            throw new Error("Article not found");
        }
        this.articles = this.articles.map(article => {
            if (article.id === id) {
                return { ...article, ...updatedArticle };
            }
            return article;
        });
    }

    searchArticles(params) {
        if (!params) {
            return this.articles.map(article =>  this.mapArticle(article));
        }

        const {
            page,
            size
        } = params;

        const filteredArticles = this.filterArticles(params);
        const mappedArticles =  filteredArticles.map(article =>  this.mapArticle(article));

        const startIndex = page * size;
        const endIndex = startIndex + size;
        const totalPages = Math.ceil(mappedArticles.length / size);

        return {
            list: mappedArticles.slice(startIndex, endIndex),
            totalPages
        };
    }

    filterArticles = (params) => {
        let filtered = this.articles;
        const { year, field, title } = params;
        if(year) {
            filtered = filtered.filter(article => article.year === parseInt(year, 10));
        }
        if(field) {
            filtered = filtered.filter(article => article.field === field);
        }
        if(title) {
            filtered = filtered.filter(article => article.title.toLowerCase().includes(title.toLowerCase()));
        }
        return filtered;
    }

    mapArticle = (article) => {
        const { id, title, text, year } = article;
        return {
            id,
            title,
            text,
            year,
            authorFullName: `${article.author.firstName} ${article.author.lastName}`
        }
    }
}

const articleService = new DataSource();

export const findArticleById = (id) => articleService.findArticleById(id);
export const deleteArticleById = (id) => articleService.deleteArticleById(id);
export const createArticle = (newArticle) => articleService.createArticle(newArticle);
export const updateArticleById = (id, updatedArticle) => articleService.updateArticleById(id, updatedArticle);
export const searchArticles = (params) => articleService.searchArticles(params);
