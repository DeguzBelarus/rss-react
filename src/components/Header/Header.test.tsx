import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { describe, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { store } from '../../redux/store';
import { App } from '../../components/App';
import { act } from 'react-dom/test-utils';

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
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  test('renders the header HTML div element', async () => {
    await act(async () => {
      renderApplication();
    });
    expect(screen.getByTestId('app-header')).toBeInTheDocument();
  });

  test('filter input and search button present on the page', async () => {
    await act(async () => {
      renderApplication();
    });
    expect(screen.getByTestId('app-filter-input')).toBeInTheDocument();
    expect(screen.getByTestId('app-search-button')).toBeInTheDocument();
  });

  test('goes to the about us page by clicking on the link', async () => {
    await act(async () => {
      renderApplication();
    });
    fireEvent.click(screen.getByTestId('app-about-us-link'));
    expect(screen.getByTestId('app-about-us-page')).toBeInTheDocument();
  });

  test('header changes background color when search input is focused', async () => {
    await act(async () => {
      renderApplication();
    });
    fireEvent.click(screen.getByTestId('main-page-link'));
    expect(screen.getByTestId('app-filter-input')).toBeInTheDocument();
    fireEvent.focus(screen.getByTestId('app-filter-input'));
    expect(screen.getByTestId('app-header').classList.contains('search-mode-header')).toBe(true);
  });

  test('header changes background color when search input is focused', async () => {
    await act(async () => {
      renderApplication();
    });
    fireEvent.change(screen.getByTestId('app-filter-input'), { target: { value: 'Deguz' } });
    expect(store.getState().main.searchKey).toBe('Deguz');
  });
});
