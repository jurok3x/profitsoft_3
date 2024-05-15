import actionsArticles from 'app/actions/article';
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleForm from "../../form/ArticleForm";

function ArticleUpdate({ article, onCancel }) {
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleUpdate = useCallback((article) => {
        dispatch(actionsArticles.updateById({ id, article }))
    }, [dispatch])

    return(
        <ArticleForm
            onSubmit={handleUpdate}
            article={article}
            onCancel={onCancel}
        />
    );
}

export default ArticleUpdate;