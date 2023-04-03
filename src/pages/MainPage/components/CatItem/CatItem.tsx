import React, { FC } from 'react';

import { ICatObject } from 'types/types';
import './CatItem.scss';

export const CatItem: FC<ICatObject> = ({ city, breed, imageSrc, name, price }) => {
  return (
    <div className="cat-item-wrapper" data-testid="app-cat-item">
      <p className="cat-name-paragraph">{name}</p>
      <div className="cat-image-container">
        <img src={imageSrc} alt="a cat" />
      </div>
      <div className="cat-info-container">
        <span>{breed}</span>
        <span className="price-span">{`${price}$`}</span>
        <span>&#8962;{` ${city}`}</span>
      </div>
    </div>
  );
};
