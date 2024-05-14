import { useCallback } from "react";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import ArticleForm from "./ArticleForm";

function ArticleUpdate({ article, onCancel }) {

    const handleUpdate = useCallback(() => {
        toastr.success(`Article updated!`)
    }, [])

    return(
        <ArticleForm
            onSubmit={handleUpdate}
            article={article}
            onCancel={onCancel}
        />
    );
}

export default ArticleUpdate;