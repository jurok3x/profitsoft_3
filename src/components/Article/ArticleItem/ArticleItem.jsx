import Card from "components/Card";
import CardContent from "components/CardContent";
import CardTitle from "components/CardTitle";

import CardActions from "components/CardActions";
import Link from "components/Link";
import styles from '../style.module.css';

function ArticleItem({ article }) {
    const { id, title, text, year, authorFullName } = article;

    return (
        <Card>
            <CardTitle>{title}</CardTitle>
            <CardContent>
                <p className={styles.card}>{year}</p>
                <p>{authorFullName}</p>
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
