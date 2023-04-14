import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';

import { store } from 'redux/store';
import { App } from 'components/App';

const maxCatCards = 50;
const renderApplication = (): void => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

describe('Main page tests', (): void => {
  test('renders the main HTML div element of MainPage component', () => {
    renderApplication();
    expect(screen.getByTestId('app-main-page')).toBeInTheDocument();
  });

  test('checks correct count of CatItem components on the MainPage', async () => {
    renderApplication();
    expect((await waitFor(() => screen.getAllByTestId('app-cat-item'))).length).toBe(maxCatCards);
  });
});
