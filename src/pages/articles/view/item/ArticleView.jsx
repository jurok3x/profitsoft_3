import { Button } from '@mui/material';
import Status from 'app/constants/status';
import Card from 'components/Card';
import CardActions from 'components/CardActions';
import CardTitle from 'components/CardTitle';
import CircularProgress from 'components/CircularProgress';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ArticleUpdate from '../update/ArticleUpdate';
import ArticleViewCard from './ArticleViewCard';

function ArticleView() {
    const navigate = useNavigate();
    const [update, setUpdate] = useState(false);
    const [article, setArticle] = useState({});
    const {
        currentArticle,
        status,
        errors,
    } = useSelector(({ article }) => article);

    useEffect(() => {
        setArticle(currentArticle);
    }, [currentArticle]);

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
            {status === Status.ERROR && <Card variant='error'>
                                            <CardTitle>{errors.map(error => error.message)}</CardTitle>
                                            <CardActions><Button onClick={handleNavigateBack}>Go Back</Button></CardActions>
                                        </Card>}
            {status === Status.SUCCESS && (
                update ?
                        <ArticleUpdate
                            article={article}
                            onCancel={handleCancelClick}
                            setUpdate={setUpdate}
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