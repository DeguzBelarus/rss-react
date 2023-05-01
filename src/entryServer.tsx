import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';

import { App } from './components/App';
import { getCatsDataAsync } from './redux/thunks';
import { setupStore } from './redux/store';

const store = setupStore();
await store.dispatch(getCatsDataAsync(''));

export const render = async (url: string, options: RenderToPipeableStreamOptions) => {
  const app = (
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );
  return [renderToPipeableStream(app, options), store];
};
