import Loading from 'components/Loading';
import * as pages from 'constants/pages';
import pageURLs from 'constants/pagesURLs';
import AuthoritiesProvider from 'misc/providers/AuthoritiesProvider';
import ThemeProvider from 'misc/providers/ThemeProvider';
import UserProvider from 'misc/providers/UserProvider';
import { addAxiosInterceptors } from 'misc/requests';
import DefaultPage from 'pageProviders/Default';
import LoginPage from 'pageProviders/Login';
import SecretPage from 'pageProviders/Secret';
import PageContainer from 'pageProviders/components/PageContainer';
import React, { useEffect, useState } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import ArticleList from 'components/Article/ArticleList';
import View from 'pages/default/containers/View';
import actionsUser from '../actions/user';
import Header from '../components/Header';
import IntlProvider from '../components/IntlProvider';
import MissedPage from '../components/MissedPage';
import SearchParamsConfigurator from '../components/SearchParamsConfigurator';

function App() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    componentDidMount: false,
  });

  const {
    errors,
    isFailedSignIn,
    isFailedSignUp,
    isFetchingSignIn,
    isFetchingSignUp,
    isFetchingUser,
  } = useSelector(({ user }) => user);

  useEffect(() => {
    addAxiosInterceptors({
      onSignOut: () => dispatch(actionsUser.fetchSignOut()),
    });
    dispatch(actionsUser.fetchUser());
    setState({
      ...state,
      componentDidMount: true,
    });
  }, []);

  return (
    <UserProvider>
      <AuthoritiesProvider>
        <ThemeProvider>
          <BrowserRouter>
            <SearchParamsConfigurator />
            {/* This is needed to let first render passed for App's
              * configuration process will be finished (e.g. locationQuery
              * initializing) */}
            {state.componentDidMount && (
              <IntlProvider>
                <Header onLogout={() => dispatch(actionsUser.fetchSignOut())} />
                {isFetchingUser && (
                  <PageContainer>
                    <Loading />
                  </PageContainer>
                )}
                {!isFetchingUser && (
                  <Routes>
                    <Route
                      element={
                      <DefaultPage>
                        <ArticleList />
                      </DefaultPage>}
                      path={`${pageURLs[pages.defaultPage]}`}
                    />
                    <Route
                      element={
                      <DefaultPage>
                        <View />
                      </DefaultPage>}
                      path={`${pageURLs[pages.view]}`}
                    />
                    <Route
                      element={<SecretPage />}
                      path={`${pageURLs[pages.secretPage]}`}
                    />
                    <Route
                      element={(
                        <LoginPage
                          errors={errors}
                          isFailedSignIn={isFailedSignIn}
                          isFailedSignUp={isFailedSignUp}
                          isFetchingSignIn={isFetchingSignIn}
                          isFetchingSignUp={isFetchingSignUp}
                          onSignIn={({
                            email,
                            login,
                            password,
                          }) => dispatch(actionsUser.fetchSignIn({
                            email,
                            login,
                            password,
                          }))}
                          onSignUp={({
                            email,
                            firstName,
                            lastName,
                            login,
                            password,
                          }) => dispatch(actionsUser.fetchSignUp({
                            email,
                            firstName,
                            lastName,
                            login,
                            password,
                          }))}
                        />
                      )}
                      path={`${pageURLs[pages.login]}`}
                    />
                    <Route
                      element={(
                        <MissedPage
                          redirectPage={`${pageURLs[pages.defaultPage]}`}
                        />
                      )}
                      path="*"
                    />
                  </Routes>
                )}
              </IntlProvider>
            )}
          </BrowserRouter>
        </ThemeProvider>
      </AuthoritiesProvider>
    </UserProvider>
  );
}

export default App;
