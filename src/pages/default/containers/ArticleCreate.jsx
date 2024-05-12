import actionsArticles from 'app/actions/article';
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import AddArticleForm from "./ArticleForm";

function ArticleCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = useCallback((article) => {
        const newArticle = {
            ...article,
            authorId:"f47ac10b-58cc-4372-a567-0e02b2c3d479"
        };
        dispatch(actionsArticles.save(newArticle));
        navigate('/');
    }, [dispatch])

    return(
        <AddArticleForm
            onSave={handleSave}
        />
    );
}

export default ArticleCreate;