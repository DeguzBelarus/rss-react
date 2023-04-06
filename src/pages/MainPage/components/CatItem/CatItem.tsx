import React, { FC } from 'react';

import { ICardCatObject, Nullable } from 'types/types';
import { SERVER_STATIC_URL } from 'constants/constants';
import './CatItem.scss';

interface Props extends ICardCatObject {
  setCurrentCatId: React.Dispatch<React.SetStateAction<Nullable<number>>>;
}

export const CatItem: FC<Props> = ({
  breed,
  name,
  image: imageSrc,
  price,
  sex,
  id,
  setCurrentCatId,
}) => {
  return (
    <div
      className="cat-item-wrapper"
      onClick={() => setCurrentCatId(id)}
      data-testid="app-cat-item"
    >
      <p className="cat-name-paragraph">{name}</p>
      <div className="cat-image-container">
        <img src={`${SERVER_STATIC_URL}${imageSrc}`} alt="a cat" />
      </div>
      <div className="cat-info-container">
        <span>{breed}</span>
        <span className="price-span">{`${price} RUB`}</span>
        {sex ? <span>&#9794;</span> : <span>&#9792;</span>}
      </div>
    </div>
  );
};
