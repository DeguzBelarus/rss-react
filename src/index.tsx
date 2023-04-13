import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';

import { App } from './components/App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
root.render(app);
