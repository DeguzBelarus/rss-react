import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';

import { App } from './components/App';
import { store } from './redux/store';
import { getCatsDataAsync } from './redux/thunks';

export const render = (url: string, options: RenderToPipeableStreamOptions) => {
  const app = (
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );
  return renderToPipeableStream(app, options);
};
