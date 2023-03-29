import React, { FC, useState, useEffect } from 'react';

import { Header } from 'components/Header/Header';
import { ICatObject } from 'types/types';
import { catsData } from 'catsData';
import { CatItem } from './components/CatItem/CatItem';
import './MainPage.scss';

export const MainPage: FC = () => {
  const [filterKey, setFilterKey] = useState('');
  const [filteredCatsData, setFilteredCatsData] = useState<Array<ICatObject>>([]);

  const filterKeyLoadData = () => {
    if (localStorage.getItem('rss-save')) {
      setFilterKey(JSON.parse(localStorage.getItem('rss-save') || ''));
    }
  };

  const filterKeyUpdateData = (key: string) => {
    setFilterKey(key);
    localStorage.setItem('rss-save', JSON.stringify(key));
  };

  useEffect(() => {
    setFilteredCatsData(
      filterKey
        ? catsData.filter((catData) =>
            catData.name.toUpperCase().startsWith(filterKey.toUpperCase())
          )
        : catsData
    );
  }, [filterKey]);

  useEffect(() => {
    filterKeyLoadData();
    setFilteredCatsData(catsData);
  }, []);
  return (
    <>
      <Header origin="main-page" filterKeyUpdateData={filterKeyUpdateData} filterKey={filterKey} />
      <div className="main-page-wrapper" data-testid="app-main-page">
        {filteredCatsData.length ? (
          filteredCatsData.map((catData) => {
            return (
              <CatItem
                breed={catData.breed}
                city={catData.city}
                id={catData.id}
                imageSrc={catData.imageSrc}
                name={catData.name}
                price={catData.price}
                key={catData.id}
              />
            );
          })
        ) : (
          <span>{'There are no cats here ;('}</span>
        )}
      </div>
    </>
  );
};
