import Card from "components/Card";
import CardContent from "components/CardContent";
import CardTitle from "components/CardTitle";

import styles from '../style.module.css';

function ArticleItem({article}) {
    const { title, text, year, authorFullName } = article;

    return (
        <Card>
            <CardTitle>{title}</CardTitle>
            <CardContent>
                <p className={styles.card}>{year}</p>
                <p>{authorFullName}</p>
            </CardContent>
        </Card>
        );
    }

export default ArticleItem;
