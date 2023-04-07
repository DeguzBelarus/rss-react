import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { App } from 'components/App';
import { fetchData } from 'utils/utils';
import { CAT_DATA_BASE_URL } from '../constants/constants';
import { ICardCatObject } from 'types/types';

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
    const cardsDataMock: Array<ICardCatObject> = [
      {
        id: 1,
        breed: 'Абиссинская',
        price: 20000,
        discont: 0,
        sex: 0,
        name: 'Бенедикт',
        color: [3],
        colorOption: '',
        age: 12,
        raiting: 3.1,
        catterys: 'Tany Mur',
        counts: 11,
        description:
          'Ласковый и игривый, умный и красивый. Любит играть, спать и кушать. Тянуться к человеку, очень любознателен. Будет всегда рядом, хороший помощник и верный друг.',
        image: 'assets/images/1/1.jpg',
      },
      {
        id: 2,
        breed: 'Американский бобтейл',
        price: 25000,
        discont: 15000,
        sex: 0,
        name: 'Винсент',
        color: [3],
        colorOption: 'полосатый',
        age: 11,
        raiting: 3.4,
        catterys: 'Fluffy Company',
        counts: 4,
        description:
          'По природе – чуть щеночек и чуть маленький котик, маленькая обезьянка и маленький ребёнок. Утративший агрессию, любящий, нежный и общительный.',
        image: 'assets/images/2/1.jpg',
      },
    ];

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => cardsDataMock,
      })
    );

    const cardsResponse = await fetchData(`${CAT_DATA_BASE_URL}?q=`);
    const cards = await cardsResponse.json();
    expect(cards).toBe(cardsDataMock);
  });

  test('get one cat data api', async () => {
    const cardDataMock: Array<ICardCatObject> = [
      {
        id: 1,
        breed: 'Абиссинская',
        price: 20000,
        discont: 0,
        sex: 0,
        name: 'Бенедикт',
        color: [3],
        colorOption: '',
        age: 12,
        raiting: 3.1,
        catterys: 'Tany Mur',
        counts: 11,
        description:
          'Ласковый и игривый, умный и красивый. Любит играть, спать и кушать. Тянуться к человеку, очень любознателен. Будет всегда рядом, хороший помощник и верный друг.',
        image: 'assets/images/1/1.jpg',
      },
    ];

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => cardDataMock,
      })
    );

    const cardsResponse = await fetchData(`${CAT_DATA_BASE_URL}?id=1`);
    const cards = await cardsResponse.json();
    expect(cards[0]).toBe(cardDataMock[0]);
  });
});
