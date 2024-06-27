const config = {
  // Services
  USERS_SERVICE: 'https://httpwwwbookstore-yuriicom.com:8443/oauth/authenticate',
  ARTICLES_SERVICE: 'http://34.79.28.55:8080/api/v1/articles',
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
