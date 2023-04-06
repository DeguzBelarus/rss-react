import React, { FC, useState, useEffect, useCallback } from 'react';

import { Header } from 'components/Header/Header';
import { ICardCatObject, Nullable } from 'types/types';
import { CatItem } from './components/CatItem/CatItem';
import { fetchData } from 'utils/utils';
import { Loader } from 'components/Loader/Loader';
import { CatModal } from './components/CatModal/CatModal';
import { CAT_DATA_BASE_URL } from 'constants/constants';
import './MainPage.scss';

export const MainPage: FC = () => {
  const [filterKey, setFilterKey] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isCurrentCatFetching, setIsCurrentCatFetching] = useState(false);
  const [isLocalStorageDataLoaded, setIsLocalStorageDataLoaded] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [currentCatId, setCurrentCatId] = useState<Nullable<number>>(null);
  const [catsData, setCatsData] = useState<Array<ICardCatObject>>([]);
  const [currentCatData, setCurrentCatData] = useState<Nullable<ICardCatObject>>(null);

  const filterKeyLoadData = () => {
    if (localStorage.getItem('rss-save')) {
      setFilterKey(JSON.parse(localStorage.getItem('rss-save') || ''));
    }
  };

  const filterKeyUpdateData = (key: string) => {
    setFilterKey(key.replace(/^\s\s*/, ''));
    localStorage.setItem('rss-save', JSON.stringify(key));
  };

  const getCatsData = useCallback(async () => {
    const params = new URLSearchParams();
    params.append('q', filterKey);
    setIsFetching(true);
    const response = await fetchData(`${CAT_DATA_BASE_URL}?${params}`);
    const catsData: Array<ICardCatObject> = await response.json();
    setCatsData(catsData);
    setIsFetching(false);
  }, [filterKey]);

  useEffect(() => {
    if (!isLocalStorageDataLoaded) {
      filterKeyLoadData();
      setIsLocalStorageDataLoaded(true);
    } else {
      if (!isFetched) {
        getCatsData();
        setIsFetched(true);
      }
    }
  }, [isLocalStorageDataLoaded, getCatsData, isFetched]);
  return (
    <>
      <Header
        origin="main-page"
        filterKeyUpdateData={filterKeyUpdateData}
        filterKey={filterKey}
        getCatsData={getCatsData}
        currentCatId={currentCatId}
      />
      <div
        className={catsData.length && !isFetching ? 'main-page-wrapper' : 'main-page-wrapper empty'}
        data-testid="app-main-page"
      >
        {isFetching ? (
          <Loader origin="main-page" />
        ) : catsData.length ? (
          <div className="cats-container">
            {catsData.map((catData) => {
              return <CatItem {...catData} setCurrentCatId={setCurrentCatId} key={catData.id} />;
            })}
          </div>
        ) : (
          <h3 className="no-cats-span">{'There are no cats here ;('}</h3>
        )}
        {currentCatId ? (
          <CatModal
            currentCatId={currentCatId}
            isCurrentCatFetching={isCurrentCatFetching}
            setIsCurrentCatFetching={setIsCurrentCatFetching}
            currentCatData={currentCatData}
            setCurrentCatData={setCurrentCatData}
            setCurrentCatId={setCurrentCatId}
          />
        ) : null}
      </div>
    </>
  );
};
