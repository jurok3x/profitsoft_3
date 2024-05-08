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

import ArticleFilter from '../ArticleFilter';
import styles from '../style.module.css';

function ArticleList() {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(() => {
        const storedPage = localStorage.getItem('currentPage');
        return storedPage ? parseInt(storedPage, 10) : 1;
    });

    const [pageSize, setPageSize] = useState(() => {
        const storedPageSize = localStorage.getItem('pageSize');
        return storedPageSize ? parseInt(storedPageSize, 10) : 10;
    });

    const [params, setParams] = useState({});

    const handleSelectPage = (page) => {
        setCurrentPage(page);
    };

    const handleSelectPageSize = (size) => {
        setPageSize(size);
    };

    const handleSearchParamsChange = (params) => {
        const newParams = Object.fromEntries(
            Object.entries(params).filter(([key, value]) => value)
        );
        setCurrentPage(1);
        setParams(newParams);
    };

    const {
        articles,
        status,
        totalPages,
    } = useSelector(({ article }) => article);

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
        localStorage.setItem('pageSize', pageSize.toString());
        console.log(currentPage)
        dispatch(actionsArticles.findArticles({
            size: pageSize,
            page: currentPage,
            params,
        }));
    }, [currentPage, pageSize, params]);

    return (
        <>
            <ArticleFilter
                    params={params}
                    onFilterChange={handleSearchParamsChange}
            />
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