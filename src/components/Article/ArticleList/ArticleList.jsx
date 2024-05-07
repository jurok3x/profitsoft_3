import actionsArticles from 'app/actions/article';
import Status from "app/constants/status";
import CircularProgress from 'components/CircularProgress';
import Paginator from 'components/Paginator/Paginator';
import React, { useEffect, useState } from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import ArticleItem from '../ArticleItem/ArticleItem';

function ArticleList() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const handleSelectPage = (page) => {
        setCurrentPage(page);
        dispatch(actionsArticles.findArticles({
            page,
        }));
    };

    const {
        articles,
        status,
        totalPages,
    } = useSelector(({ article }) => article);

    useEffect(() => {
        dispatch(actionsArticles.findArticles());
    }, []);

    return (
        <>
            {status === Status.PENDING ? (
                <CircularProgress />
            ) : (
            <>
                {articles.map((article) => (
                <ArticleItem
                    article={article}
                    key={article.id}
                />
                ))}
                <Paginator
                    totalPages={totalPages}
                    onPageSelect={handleSelectPage}
                    currentPage={currentPage}
                />
            </>
            )}
        </>
    );
}

export default ArticleList;