import EditIcon from '@mui/icons-material/Edit';
import { Button, Paper } from "@mui/material";
import Typography from "components/Typography";
import { useCallback } from "react";
import styles from './styles.module.css';

function ArticleViewCard({ article, onUpdateClick }) {
    const { title, text, field, journal, year, author } = article;
    const firstName = author ? author.firstName : '';
    const lastName = author ? author.lastName : '';

    const capitalizeFirstLetter = (text) => {
        if(!text){
            return '';
        }
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    const handleUpdateClick = useCallback(() => {
        onUpdateClick();
    }, [onUpdateClick])

    return (
        <Paper elevation={3} className={styles.view}>
            <div className={styles.view__title}>
                <Typography  variant="title" color="#000000" align="center">
                    {title}
                </Typography>
                <Button onClick={handleUpdateClick}><EditIcon/></Button>
            </div>
            <Typography variant="default" color="#000000">
                {text || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, nobis voluptates suscipit atque in quod minus blanditiis fugiat eius error. Reiciendis eaque error harum odit. Provident aspernatur sunt aliquam tempore!"}
            </Typography>
            <div className={styles.view__info}>
                <Typography variant="default" color="#000000">
                    <span>Area:</span> {capitalizeFirstLetter(field)}
                </Typography>
                <Typography variant="default" color="#000000">
                    <span>Published by:</span> {journal}
                </Typography>
                <Typography variant="default" color="#000000">
                    <span>Year:</span> {year}
                </Typography>
                <Typography variant="default" color="#000000">
                    <span>Author:</span> {firstName} {lastName}
                </Typography>
            </div>
        </Paper>
    );
}

export default ArticleViewCard;
