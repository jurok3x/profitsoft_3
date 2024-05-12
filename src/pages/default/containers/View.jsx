import actionsArticles from 'app/actions/article';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import ArticleCreate from './ArticleCreate';
import ArticleUpdate from './ArticleUpdate';
import ArticleView from './ArticleView';

function View() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);

  useEffect(() => {
      if(id === 'new') {
        setCreate(true);
        setUpdate(false);
        return;
      }

      dispatch(actionsArticles.findById(id));
      const searchParams = new URLSearchParams(location.search);
      const updateMode = searchParams.has('update');

      if(updateMode) {
        setCreate(false);
        setUpdate(true);
      } else {
        setCreate(false);
        setUpdate(false);
      }
  }, [dispatch, id]);

  const saveArticle = useCallback((article) => {
    dispatch(actionsArticles.save(article));
  }, [])

  return (
    <>
      {update && <ArticleUpdate />}
      {create && <ArticleCreate />}
      {!create && !update && <ArticleView />}
    </>
  );
}

export default View;
