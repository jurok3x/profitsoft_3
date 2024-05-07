import actionsArticles from 'app/actions/article';
import Status from "app/constants/status";
import CircularProgress from 'components/CircularProgress';
import PageSizeSelect from 'components/PageSizeSelect';
import Paginator from 'components/Paginator/Paginator';
import React, { useEffect, useState } from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import ArticleItem from '../ArticleItem/ArticleItem';

import styles from '../style.module.css';

function ArticleList() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleSelectPage = (page) => {
        setCurrentPage(page);
        dispatch(actionsArticles.findArticles({
            page,
            size: pageSize,
        }));
    };

    const handleSelectPageSize = (size) => {
        setPageSize(size);
        dispatch(actionsArticles.findArticles({
            size,
            page: currentPage,
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
                <div className={styles.page__select}>
                    <Paginator
                        totalPages={totalPages}
                        onPageSelect={handleSelectPage}
                        currentPage={currentPage}
                    />
                    <PageSizeSelect
                        pageSize={pageSize}
                        onPageSizeChange={handleSelectPageSize}
                    />
                </div>
            </>
            )}
        </>
    );
}

export default ArticleList;