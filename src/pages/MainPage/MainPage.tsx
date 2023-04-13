import React, { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

import { Header } from 'components/Header/Header';
import { CatItem } from './components/CatItem/CatItem';
import { Loader } from 'components/Loader/Loader';
import { CatModal } from './components/CatModal/CatModal';
import {
  getRequestStatus,
  getCatsDataAsync,
  getSearchKey,
  getCatsData,
  getCurrentCatId,
  getIsFirstLoad,
  setIsFirstLoad,
} from 'redux/mainSlice';
import './MainPage.scss';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const requestStatus = useAppSelector(getRequestStatus);
  const searchKey = useAppSelector(getSearchKey);
  const catsData = useAppSelector(getCatsData);
  const currentCatId = useAppSelector(getCurrentCatId);
  const isFirstLoad = useAppSelector(getIsFirstLoad);

  useEffect(() => {
    if (!isFirstLoad) {
      dispatch(getCatsDataAsync(searchKey));
      dispatch(setIsFirstLoad(true));
    }
  }, [dispatch, isFirstLoad, searchKey]);
  return (
    <>
      <Header origin="main-page" currentCatId={currentCatId} />
      <div
        className={
          catsData.length && requestStatus !== 'loading'
            ? 'main-page-wrapper'
            : 'main-page-wrapper empty'
        }
        data-testid="app-main-page"
      >
        {requestStatus === 'loading' ? (
          <Loader origin="main-page" />
        ) : catsData.length ? (
          <div className="cats-container">
            {catsData.map((catData) => {
              return <CatItem {...catData} key={catData.id} />;
            })}
          </div>
        ) : (
          <h3 className="no-cats-span">{'Кошек не найдено ;('}</h3>
        )}
        {currentCatId ? <CatModal /> : null}
      </div>
    </>
  );
};
