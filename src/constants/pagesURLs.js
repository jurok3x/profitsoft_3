import config from 'config';
import * as pages from './pages';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.view]: `${config.UI_URL_PREFIX}/${pages.view}`,
  [pages.login]: `https://httpwwwbookstore-yuriicom.com:8443/oauth/authenticate`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
};

export default result;
