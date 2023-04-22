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

  test('filter input presents on the page', async () => {
    await act(async () => {
      renderApplication();
    });
    expect(screen.getByTestId('app-filter-input')).toBeInTheDocument();
  });

  test('goes to the about us page by clicking on the link', async () => {
    await act(async () => {
      renderApplication();
    });
    fireEvent.click(screen.getByTestId('app-about-us-link'));
    expect(screen.getByTestId('app-about-us-page')).toBeInTheDocument();
  });
});
