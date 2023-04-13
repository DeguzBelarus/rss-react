import React, { FC } from 'react';
import { useAppDispatch } from 'redux/hooks';

import { setCurrentCatId } from 'redux/mainSlice';
import { ICardCatObject } from 'types/types';
import { SERVER_STATIC_URL } from 'constants/constants';
import './CatItem.scss';

export const CatItem: FC<ICardCatObject> = ({ breed, name, image: imageSrc, price, sex, id }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className="cat-item-wrapper"
      onClick={() => dispatch(setCurrentCatId(id))}
      data-testid="app-cat-item"
    >
      <p className="cat-name-paragraph">{name}</p>
      <div className="cat-image-container">
        <img src={`${SERVER_STATIC_URL}${imageSrc}`} alt="a cat" />
      </div>
      <div className="cat-info-container">
        <span>{breed}</span>
        <span className="price-span">{`${price} RUB`}</span>
        {!sex ? <span>&#9794;</span> : <span>&#9792;</span>}
      </div>
    </div>
  );
};
