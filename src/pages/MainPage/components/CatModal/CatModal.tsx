import React, { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import {
  getCatDataAsync,
  getRequestStatus,
  setCurrentCatData,
  getCurrentCatData,
  getCurrentCatId,
  setCurrentCatId,
} from 'redux/mainSlice';
import { Nullable } from 'types/types';
import { Loader } from 'components/Loader/Loader';
import { SERVER_STATIC_URL } from 'constants/constants';
import './CatModal.scss';

export const CatModal: FC = () => {
  const catModalWrapper = useRef<Nullable<HTMLDivElement>>(null);

  const dispatch = useAppDispatch();

  const requestStatus = useAppSelector(getRequestStatus);
  const currentCatData = useAppSelector(getCurrentCatData);
  const currentCatId = useAppSelector(getCurrentCatId);

  const closeCatModal = () => {
    dispatch(setCurrentCatId(null));
    dispatch(setCurrentCatData(null));
  };

  const closeCatModalByGreyArea = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === catModalWrapper.current) {
      closeCatModal();
    }
  };

  useEffect(() => {
    currentCatId && dispatch(getCatDataAsync(String(currentCatId)));
  }, [currentCatId, dispatch]);
  return (
    <div
      className="cat-modal-wrapper"
      onClick={(event) => closeCatModalByGreyArea(event)}
      ref={catModalWrapper}
    >
      <div
        className={requestStatus === 'loading' ? 'cat-data-container empty' : 'cat-data-container'}
      >
        {requestStatus === 'loading' ? (
          <Loader origin="cat-modal" />
        ) : currentCatData ? (
          <>
            <h2 className="cat-name-heading">{currentCatData.name}</h2>
            <div className="upper-container">
              <div className="poster-container">
                <img
                  className="cat-modal-poster"
                  src={`${SERVER_STATIC_URL}${currentCatData.image}`}
                  alt="a cat"
                />
              </div>
              <div className="basic-info-container">
                <span>{`возраст, месяцев: ${currentCatData.age}`}</span>
                {!currentCatData.sex ? (
                  <span>{'пол: '}&#9794;</span>
                ) : (
                  <span>{'пол: '}&#9792;</span>
                )}
                <span>{`порода: ${currentCatData.breed}`}</span>
                <span>{`питомник: ${currentCatData.catterys}`}</span>
                <span>{`цвет: ${currentCatData.color}`}</span>
                {currentCatData.colorOption ? (
                  <span>{`окрас: ${currentCatData.colorOption}`}</span>
                ) : null}
                <span>{`рейтинг: ${currentCatData.raiting}`}</span>
                <span>{`посетителей: ${currentCatData.counts}`}</span>
                <span
                  className={currentCatData.discont ? 'old-price' : undefined}
                >{`цена: ${currentCatData.price} RUB`}</span>
                {currentCatData.discont ? (
                  <span>{`со скидкой: ${currentCatData.discont} RUB`}</span>
                ) : null}
              </div>
            </div>
            <h3>Описание:</h3>
            <p>{currentCatData.description}</p>
            <button type="button" className="close-button" onClick={closeCatModal}>
              &times;
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};
