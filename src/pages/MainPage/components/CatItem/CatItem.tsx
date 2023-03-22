import React, { Component } from 'react';

import { ICatObject } from 'types/types';
import './CatItem.scss';

export class CatItem extends Component<ICatObject> {
  render() {
    const { breed, name, imageSrc, homeCity, price } = this.props;
    return (
      <div className="cat-item-wrapper" data-testid="app-cat-item">
        <p className="cat-name-paragraph">{name}</p>
        <div className="cat-image-container">
          <img src={imageSrc} alt="a cat" />
        </div>
        <div className="cat-info-container">
          <span>{breed}</span>
          <span className="price-span">{`${price}$`}</span>
          <span>&#8962;{` ${homeCity}`}</span>
        </div>
      </div>
    );
  }
}
