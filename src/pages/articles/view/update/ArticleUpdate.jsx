import actionsArticles from 'app/actions/article';
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import ArticleForm from "../../form/ArticleForm";

function ArticleUpdate({ article, setUpdate, onCancel }) {
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleUpdate = useCallback((article) => {
        dispatch(actionsArticles.updateById({ id, article }))
        toastr.success(`Article updated!`);
        setUpdate(false);
    }, [dispatch, setUpdate, id])

    return(
        <ArticleForm
            onSubmit={handleUpdate}
            article={article}
            onCancel={onCancel}
        />
    );
}

export default ArticleUpdate;