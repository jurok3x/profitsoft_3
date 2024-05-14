import { Button } from '@mui/material';
import Status from 'app/constants/status';
import Card from 'components/Card';
import CircularProgress from 'components/CircularProgress';
import React, { useCallback, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ArticleUpdate from './ArticleUpdate';
import ArticleViewCard from './ArticleViewCard';

function ArticleView() {
    const navigate = useNavigate();
    const [update, setUpdate] = useState(false);
    const {
        currentArticle: article,
        status,
        errors,
    } = useSelector(({ article }) => article);

    const handleNavigateBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleUpdateClick = useCallback(() => {
        setUpdate(true);
    }, []);

    const handleCancelClick = useCallback(() => {
        setUpdate(false);
    }, []);

    return (
        <>
            {status === Status.PENDING && <CircularProgress />}
            {status === Status.ERROR && <Card variant='error'>{errors.map(error => error.message)}</Card>}
            {status === Status.SUCCESS && (
                update ?
                        <ArticleUpdate
                            article={article}
                            onCancel={handleCancelClick}
                        /> :
                        <div>
                            <Button onClick={handleNavigateBack}>Go Back</Button>
                            <ArticleViewCard
                                article={article}
                                onUpdateClick={handleUpdateClick}
                            />
                        </div>
            )}
        </>
    );
}

export default ArticleView;