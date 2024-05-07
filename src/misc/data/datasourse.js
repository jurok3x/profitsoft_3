import jsonData from './data.json';

class DataSource {
    constructor() {
        this.articles = JSON.parse(JSON.stringify(jsonData));
    }

    findArticleById(id) {
        return this.articles.find(article => article.id === id);
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
        const filtered = this.articles.filter(article => {
            for (const key in params) {
                
                if (params.hasOwnProperty(key)) {
                    if (key === 'title' && article[key]) {
                        if (!article[key].toLowerCase().includes(params[key].toLowerCase())) {
                            return false;
                        }
                    } if (key === 'author' && article[key]) {
                        return article[key].id === params.authorId;
                    } else {
                        if (article[key] !== params[key] && article[key]) {
                            console.log(`${article[key]} and ${params[key]} `)
                            return false;
                        }
                    }
                }
            }
            return true;
        });
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
