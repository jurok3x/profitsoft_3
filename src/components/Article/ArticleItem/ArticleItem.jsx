import DeleteIcon from '@mui/icons-material/Delete';
import Card from "components/Card";
import CardContent from "components/CardContent";
import CardTitle from "components/CardTitle";

import { Button } from "@mui/material";
import CardActions from "components/CardActions";
import Link from "components/Link";
import { useCallback, useState } from "react";

import styles from '../style.module.css';

function ArticleItem({ article }) {
    const [active, setActive] = useState(false);
    const { id, title, text, year, authorFullName } = article;

    const onMouseEnter = useCallback(() => {
        setActive(true);
    }, [setActive]);

    const onMouseLeave = useCallback(() => {
        setActive(false);
    }, [setActive]);

    return (
        <Card
            handleMouseEnter={onMouseEnter}
            handleMouseLeave={onMouseLeave}
        >
            <CardTitle>{title} {active && (<Button className={styles.delete__button}><DeleteIcon style={{ color: 'red' }}/></Button>)}</CardTitle>
            <CardContent>
                <p><b>Author: </b>{authorFullName}<br/> <b>Year: </b>{year}</p>
            </CardContent>
            <CardActions>
                <Link href={`/${id}`}>
                    see more...
                </Link>
                
            </CardActions>
        </Card>
        );
    }

export default ArticleItem;
