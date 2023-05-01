import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/App';
import { RootState, setupStore } from './redux/store';
import './index.scss';

declare global {
  interface Window {
    __PRELOADED_STATE__: RootState | undefined;
  }
}

const store = setupStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
hydrateRoot(document.getElementById('root') as HTMLElement, app);
