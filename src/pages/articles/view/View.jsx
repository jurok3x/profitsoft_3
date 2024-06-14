import actionsArticles from 'app/actions/article';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ArticleCreate from './create/ArticleCreate';
import ArticleView from './item/ArticleView';

function View() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [create, setCreate] = useState(false);

  useEffect(() => {
      if(id === 'new') {
        setCreate(true);
        return;
      }
      setCreate(false);
      dispatch(actionsArticles.findById(id));
  }, [dispatch, id]);

  return (
    <>
      {create ? <ArticleCreate /> : <ArticleView />}
    </>
  );
}

export default View;
