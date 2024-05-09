import Status from 'app/constants/status';
import Card from 'components/Card';
import CircularProgress from 'components/CircularProgress';
import React from 'react';
import { useSelector } from "react-redux";

function ArticleView() {
    const {
        currentArticle: article,
        status,
        errors,
    } = useSelector(({ article }) => article);

    return (
        <>
            {status === Status.PENDING && <CircularProgress />}
            {status === Status.ERROR && <Card variant='error'>{errors[0].message}</Card>}
            {status === Status.SUCCESS && (
                <div>
                    <h2>{article.title}</h2>
                    <p>{article.text}</p>
                    <p>{article.field}</p>
                    <p>{article.journal} {article.year}</p>
                    <p>{article.author.firstName} {article.author.lastName}</p>
                </div>
            )}
        </>
    );
}

export default ArticleView;