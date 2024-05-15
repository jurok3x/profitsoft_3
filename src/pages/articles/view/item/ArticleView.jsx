import { Button } from '@mui/material';
import Status from 'app/constants/status';
import CircularProgress from 'components/CircularProgress';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import ArticleUpdate from '../update/ArticleUpdate';
import ArticleViewCard from './ArticleViewCard';

function ArticleView() {
    const navigate = useNavigate();
    const [update, setUpdate] = useState(false);
    const {
        currentArticle,
        status,
        errors,
    } = useSelector(({ article }) => article);

    useEffect(() => {
        if (status === Status.UPDATED) {
            toastr.success(`Article updated!`);
            setUpdate(false);
        } else if (status === Status.ERROR) {
            toastr.error('Failed to get the response.', errors[0].message || 'An error occurred.');
        }
    }, [status, errors]);
    

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
            {status === Status.PENDING ? <CircularProgress />
            : (
                update ?
                        <ArticleUpdate
                            article={currentArticle}
                            onCancel={handleCancelClick}
                        /> :
                        <div>
                            <Button onClick={handleNavigateBack}>Go Back</Button>
                            <ArticleViewCard
                                article={currentArticle}
                                onUpdateClick={handleUpdateClick}
                            />
                        </div>
                        
            )}
        </>
    );
}

export default ArticleView;