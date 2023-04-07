import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { App } from 'components/App';
import { fetchData } from 'utils/utils';
import { CAT_DATA_BASE_URL } from '../constants/constants';
import { cardDataMock, cardsDataMock } from 'mocks/mocks';

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

describe('fetch data tests', (): void => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('get all cats data api', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => cardsDataMock,
      })
    );

    const params = new URLSearchParams();
    params.append('q', '');

    const cardsResponse = await fetchData(`${CAT_DATA_BASE_URL}?${params}`);
    const cards = await cardsResponse.json();
    expect(cards).toBe(cardsDataMock);
  });

  test('get one cat data api', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => cardDataMock,
      })
    );

    const params = new URLSearchParams();
    params.append('id', '1');

    const cardResponse = await fetchData(`${CAT_DATA_BASE_URL}?${params}`);
    const cards = await cardResponse.json();
    expect(cards[0]).toBe(cardDataMock[0]);
  });
});
