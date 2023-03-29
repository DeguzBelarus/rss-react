import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { App } from 'components/App';

const catSelectorOptionsCount = 17;
const singleOrder = 1;

const renderPurchasesPage = (): void => {
  const purchasesRoute = '/purchases';
  render(
    <MemoryRouter initialEntries={[purchasesRoute]}>
      <App />
    </MemoryRouter>
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
    fireEvent.input(screen.getByTestId('app-name-input'), { target: { value: 'Hello Hello' } });
    fireEvent.input(screen.getByTestId('app-date-input'), { target: { value: '2023-03-22' } });
    fireEvent.change(screen.getByTestId('app-cat-selector'), { target: { value: '1' } });
    fireEvent.click(screen.getByTestId('app-notification-agree-radio'));
    fireEvent.click(screen.getByTestId('app-delivery-checkbox'));

    const file = new File(['(⌐□_□)'], 'deguz.png', { type: 'image/png' });
    fireEvent.change(screen.getByTestId('app-profile-file-input'), {
      target: { files: [file] },
    });

    global.URL.createObjectURL = jest.fn(() => 'details');
    fireEvent.click(screen.getByTestId('app-order-accept-button'));
    expect((await waitFor(() => screen.getAllByTestId('app-order-item'))).length).toBe(singleOrder);
  });
});
