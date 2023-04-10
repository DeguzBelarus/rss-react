import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import { App } from 'components/App';

const maxCatCards = 50;
const renderApplication = (): void => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
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
