import { Paper } from '@mui/material';
import Status from 'app/constants/status';
import Card from 'components/Card';
import CircularProgress from 'components/CircularProgress';
import Typography from 'components/Typography';
import React from 'react';
import { useSelector } from "react-redux";
import styles from './styles.module.css';

function ArticleView() {
    const {
        currentArticle: article,
        status,
        errors,
    } = useSelector(({ article }) => article);

    const { title, text, field, journal, year, author } = article;
    const firstName = author ? author.firstName : undefined;
    const lastName = author ? author.lastName : undefined;

    return (
        <>
            {status === Status.PENDING && <CircularProgress />}
            {status === Status.ERROR && <Card variant='error'>{errors.map(error => error.message)}</Card>}
            {status === Status.SUCCESS && (
                <Paper elevation={3} className={styles.view}>
                    <Typography variant='title' color='#000000' align='center'>
                        {title}
                    </Typography>
                    <Typography variant='default' color='#000000'>
                        {text}
                    </Typography>
                    <div className={styles.view__info}>
                        <Typography variant='default' color='#000000'>
                            <span>Area:</span> {field}
                        </Typography>
                        <Typography variant='default' color='#000000'>
                            <span>Published by:</span> {journal}
                        </Typography>
                        <Typography variant='default' color='#000000'>
                            <span>Year:</span> {year}
                        </Typography>
                        <Typography variant='default' color='#000000'>
                            <span>Author:</span> {firstName} {lastName}
                        </Typography>
                    </div>
                </Paper>
            )}
        </>
    );
}

export default ArticleView;