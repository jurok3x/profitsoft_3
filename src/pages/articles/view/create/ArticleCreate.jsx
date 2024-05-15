import actionsArticles from 'app/actions/article';
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ArticleForm from "../../form/ArticleForm";

function ArticleCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCancelClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleSave = useCallback((article) => {
        dispatch(actionsArticles.save(article));
        navigate('/');
    }, [dispatch, navigate])

    return(
        <ArticleForm
            onSubmit={handleSave}
            onCancel={handleCancelClick}
        />
    );
}

export default ArticleCreate;