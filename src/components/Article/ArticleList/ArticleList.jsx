import actionsArticles from 'app/actions/article';
import Status from "app/constants/status";
import CircularProgress from 'components/CircularProgress';
import PageSizeSelect from 'components/PageSizeSelect';
import Paginator from 'components/Paginator/Paginator';
import React, { useCallback, useEffect, useState } from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import ArticleItem from '../ArticleItem/ArticleItem';

import ArticleFilter from '../ArticleFilter';
import styles from '../style.module.css';

function ArticleList() {
    const dispatch = useDispatch();

    const getCurrentPage = () => {
        const storedPage = localStorage.getItem('currentPage');
        return storedPage ? parseInt(storedPage, 10) : 1;
    };

    const getPageSize = () => {
        const storedPageSize = localStorage.getItem('pageSize');
        return storedPageSize ? parseInt(storedPageSize, 10) : 10;
    };

    const getFilterParameter = (parameter) => {
        const storedParameter = localStorage.getItem(parameter);
        return storedParameter ? storedParameter : '';
    };

    const [params, setParams] = useState({
        page: getCurrentPage(),
        size: getPageSize(),
        year: getFilterParameter('year'),
        title: getFilterParameter('title'),
        field: getFilterParameter('field'),
    });

    const handleSelectPage = (page) => {
        localStorage.setItem('currentPage', page.toString());
        setParams({
            ...params,
            page
        });
    };

    const handleSelectPageSize = useCallback((size) => {
        localStorage.setItem('pageSize', size.toString());
        localStorage.setItem('currentPage', '1');
        setParams({
            ...params,
            size,
            page: 1,
        });
    }, [setParams]);

    const handleFilterChange = useCallback((filter) => {
        localStorage.setItem('currentPage', '1');
        localStorage.setItem('pageSize', '10');
        setParams({
            ...filter,
            size: 10,
            page: 1
        });
    }, [setParams]);

    const {
        articles,
        status,
        totalPages,
    } = useSelector(({ article }) => article);

    useEffect(() => {
        dispatch(actionsArticles.findArticles(params));
    }, [params, dispatch]);

    return (
        <>
            <ArticleFilter
                    onFilterChange={handleFilterChange}
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
                        currentPage={params.page}
                    />
                    <PageSizeSelect
                        params={params}
                        onPageSizeChange={handleSelectPageSize}
                    />
                </div>
            </>
            )}
        </>
    );
}

export default ArticleList;