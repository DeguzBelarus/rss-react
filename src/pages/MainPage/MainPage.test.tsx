import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { describe, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { store } from '../../redux/store';
import { App } from '../../components/App';
import { CatItem } from './components/CatItem/CatItem';
import { CatModal } from './components/CatModal/CatModal';
import { act } from 'react-dom/test-utils';
import { cardDataMock } from '../../mocks/mocks';
import { ICardCatObject } from '../../types/types';

const renderApplication = (): void => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

const renderCatItem = (): void => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CatItem {...(cardDataMock as unknown as ICardCatObject)} />
      </BrowserRouter>
    </Provider>
  );
};

const renderCatModal = (): void => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CatModal />
      </BrowserRouter>
    </Provider>
  );
};

describe('Main page tests', (): void => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  test('renders the main HTML div element of MainPage component', async () => {
    await act(async () => {
      renderApplication();
    });
    expect(screen.getByTestId('app-main-page')).toBeInTheDocument();
  });

  test('renders the CatItem component', async () => {
    await act(async () => {
      renderCatItem();
    });
    expect(screen.getByTestId('app-cat-item')).toBeInTheDocument();
  });

  test('renders the CatModal component', async () => {
    await act(async () => {
      renderCatModal();
    });
    expect(screen.getByTestId('app-cat-modal')).toBeInTheDocument();
  });
});
