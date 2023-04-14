import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

import { store } from 'redux/store';
import { App } from 'components/App';
const catSelectorOptionsCount = 17;
const singleOrder = 1;

const renderPurchasesPage = (): void => {
  const purchasesRoute = '/purchases';
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[purchasesRoute]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe('Purchases page tests', (): void => {
  test('renders the main HTML div element of PurchasesPage component with OrderForm component', () => {
    renderPurchasesPage();
    expect(screen.getByTestId('purchases-page')).toBeInTheDocument();
    expect(screen.getByTestId('app-order-form')).toBeInTheDocument();
  });

  test('should display correct number of cat options and cat selector', () => {
    renderPurchasesPage();
    expect(screen.getAllByRole('option').length).toBe(catSelectorOptionsCount);
    expect(screen.getByRole('combobox')).toBeInTheDocument;
  });

  test('emulates order process', async () => {
    renderPurchasesPage();
    await act(async () => {
      expect(screen.getByRole('option', { name: '-- Choose a cat to buy --' })).toBeInTheDocument();
      fireEvent.change(screen.getByTestId('app-cat-selector'), { target: { value: '1' } });
      fireEvent.input(screen.getByTestId('app-name-input'), { target: { value: 'Hello Hello' } });
      fireEvent.input(screen.getByTestId('app-date-input'), { target: { value: '2023-03-22' } });
      fireEvent.click(screen.getByTestId('app-notification-agree-radio'));
      fireEvent.click(screen.getByTestId('app-delivery-checkbox'));
      global.URL.createObjectURL = jest.fn(() => 'details');
      const file = new File(['image'], 'deguz.png', { type: 'image/png' });
      fireEvent.change(screen.getByTestId('app-profile-file-input'), {
        target: { files: [file] },
      });
    });
    fireEvent.click(screen.getByTestId('app-order-accept-button'));
    expect((await waitFor(() => screen.getAllByTestId('app-order-item'))).length).toBe(singleOrder);
  });
});
