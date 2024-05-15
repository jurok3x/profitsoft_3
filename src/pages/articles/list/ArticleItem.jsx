import DeleteIcon from '@mui/icons-material/Delete';
import actionsArticles from 'app/actions/article';
import Card from "components/Card";
import CardContent from "components/CardContent";
import CardTitle from "components/CardTitle";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

import { Button } from "@mui/material";
import CardActions from "components/CardActions";
import Link from "components/Link";
import { useCallback, useState } from "react";

import DeleteDialog from 'components/DeleteDialog';
import { useDispatch } from 'react-redux';
import styles from '../style.module.css';

function ArticleItem({ article }) {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { id, title, year, authorFullName } = article;

    const onMouseEnter = useCallback(() => {
        setActive(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setActive(false);
    }, []);

    const handleDeleteClick  = useCallback(() => {
        setDialogOpen(true);
    }, []);

    const handleDialogClose = useCallback(() => {
        setDialogOpen(false);
    }, []);

    const handleDelete = useCallback(() => {
        dispatch(actionsArticles.deleteById(id));
        toastr.success('Article deleted.')
        setDialogOpen(false);
    }, [dispatch, id]);

    return (
        <>
            <Card
                handleMouseEnter={onMouseEnter}
                handleMouseLeave={onMouseLeave}
            >
                <CardTitle>{title} {active &&
                    (<Button
                        className={styles.delete__button}
                        onClick={handleDeleteClick}
                    >
                        <DeleteIcon style={{ color: 'red' }}/>
                    </Button>)}
                </CardTitle>
                <CardContent>
                    <p><b>Author: </b>{authorFullName}<br/> <b>Year: </b>{year}</p>
                </CardContent>
                <CardActions>
                    <Link href={`/${id}`}>
                        see more...
                    </Link>
                </CardActions>
            </Card>
            <DeleteDialog
                dialogOpen={dialogOpen}
                onDialogClose={handleDialogClose}
                onDelete={handleDelete}
            />
        </>
        
        );
    }

export default ArticleItem;
