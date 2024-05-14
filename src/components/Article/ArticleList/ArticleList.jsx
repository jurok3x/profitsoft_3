import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
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

import { Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArticleFilter from '../ArticleFilter';
import styles from '../style.module.css';

function ArticleList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getQueryParam = (paramName) => {
        const searchParams = new URLSearchParams(location.search);
        const parameter = searchParams.get(paramName);
        if(paramName === 'page') {
            return parameter ? parseInt(parameter, 10) : 1;
        }
        if(paramName === 'size') {
            return parameter ? parseInt(parameter, 10) : 10;
        }
        return parameter ? parameter : '';
    };

    const [params, setParams] = useState({
        page: getQueryParam('page'),
        size: getQueryParam('size'),
        year: getQueryParam('year'),
        title: getQueryParam('title'),
        field: getQueryParam('field'),
    });

    const updateLocation = useCallback((params) => {
        const searchParams = new URLSearchParams(location.search);
        for (const key in params) {
            if (params[key]) {
                searchParams.set(key, params[key]);
            } else {
                searchParams.delete(key);
            }
        }
        navigate(`${location.pathname}?${searchParams.toString()}`);
    }, [location.pathname, location.search, navigate]);

    const handleSelectPage = (page) => {
        setParams({
            ...params,
            page
        });
    };

    const handleSelectPageSize = useCallback((size) => {
        setParams({
            ...params,
            size,
            page: 1,
        });
    }, [params, setParams]);

    const handleFilterChange = useCallback((filter) => {
        setParams({
            ...filter,
            size: 10,
            page: 1
        });
    }, []);

    const {
        articles,
        status,
        totalPages,
    } = useSelector(({ article }) => article);

    useEffect(() => {
        updateLocation(params);
        dispatch(actionsArticles.findArticles(params));
    }, [updateLocation, params, dispatch]);

    return (
        <>
            <div className={styles.top}>
                <Link underline="none" href={'/new'}><LibraryAddOutlinedIcon /></Link>
                <ArticleFilter
                        filter={params}
                        onFilterChange={handleFilterChange}
                />
            </div>
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