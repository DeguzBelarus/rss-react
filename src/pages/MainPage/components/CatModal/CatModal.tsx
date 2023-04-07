import React, { FC, useCallback, useEffect } from 'react';

import { fetchData } from 'utils/utils';
import { ICardCatObject, Nullable } from 'types/types';
import { Loader } from 'components/Loader/Loader';
import { CAT_DATA_BASE_URL, SERVER_STATIC_URL } from 'constants/constants';
import './CatModal.scss';

interface Props {
  currentCatId: number;
  isCurrentCatFetching: boolean;
  setIsCurrentCatFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCatData: React.Dispatch<React.SetStateAction<Nullable<ICardCatObject>>>;
  currentCatData: Nullable<ICardCatObject>;
  setCurrentCatId: React.Dispatch<React.SetStateAction<Nullable<number>>>;
}

export const CatModal: FC<Props> = ({
  currentCatId,
  setIsCurrentCatFetching,
  isCurrentCatFetching,
  currentCatData,
  setCurrentCatData,
  setCurrentCatId,
}) => {
  const getOneCatData = useCallback(async () => {
    const params = new URLSearchParams();
    params.append('id', String(currentCatId));
    setIsCurrentCatFetching(true);
    const response = await fetchData(`${CAT_DATA_BASE_URL}?${params}`);
    const catData: Array<ICardCatObject> = await response.json();
    setIsCurrentCatFetching(false);
    setCurrentCatData(catData[0]);
  }, [currentCatId, setCurrentCatData, setIsCurrentCatFetching]);

  const closeCatModal = () => {
    setCurrentCatId(null);
    setCurrentCatData(null);
  };

  useEffect(() => {
    getOneCatData();
  }, [getOneCatData]);
  return (
    <div className="cat-modal-wrapper">
      <div className={isCurrentCatFetching ? 'cat-data-container empty' : 'cat-data-container'}>
        {isCurrentCatFetching ? (
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
                {currentCatData.sex ? <span>{'пол: '}&#9794;</span> : <span>{'пол: '}&#9792;</span>}
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
