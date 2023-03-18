import React, { Component } from 'react';

import { ICatObject } from 'types/types';
import './CatItem.scss';

export class CatItem extends Component<ICatObject> {
  render() {
    return (
      <div className="cat-item-wrapper" data-testid="app-cat-item">
        <p className="cat-name-paragraph">{this.props.name}</p>
        <div className="cat-image-container">
          <img src={this.props.imageSrc} alt="a cat" />
        </div>
        <div className="cat-info-container">
          <span>{this.props.breed}</span>
          <span>&#8962;{` ${this.props.homeCity}`}</span>
        </div>
      </div>
    );
  }
}
