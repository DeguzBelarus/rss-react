import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';

import { App } from './components/App';
import { store } from './redux/store';
import './index.scss';

(function (store: Store) {
  const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  hydrateRoot(document.getElementById('root') as HTMLElement, app);
})(store);
