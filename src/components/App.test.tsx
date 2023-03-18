import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from 'components/App';

describe('App tests', (): void => {
  test('landing on a bad page', () => {
    const badRoute = '/badroute';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('app-page-404')).toBeInTheDocument();
  });
});
