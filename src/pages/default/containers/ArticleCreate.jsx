import actionsArticles from 'app/actions/article';
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ArticleForm from "./ArticleForm";

function ArticleCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCancelClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleSave = useCallback((article) => {
        const newArticle = {
            ...article,
            authorId:"f47ac10b-58cc-4372-a567-0e02b2c3d479"
        };
        dispatch(actionsArticles.save(newArticle));
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