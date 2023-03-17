import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
root.render(app);
