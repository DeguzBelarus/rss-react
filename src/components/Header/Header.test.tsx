import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';

import { store } from 'redux/store';
import { App } from 'components/App';

const renderApplication = (): void => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

describe('Header tests', (): void => {
  test('renders the header HTML div element', () => {
    renderApplication();
    expect(screen.getByTestId('app-header')).toBeInTheDocument();
  });

  test('filter input presents on the page', () => {
    renderApplication();
    expect(screen.getByTestId('app-filter-input')).toBeInTheDocument();
  });

  test('goes to the about us page by clicking on the link', () => {
    renderApplication();
    fireEvent.click(screen.getByTestId('app-about-us-link'));
    expect(screen.getByTestId('app-about-us-page')).toBeInTheDocument();
  });
});
