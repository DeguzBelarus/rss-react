import React, { Component } from 'react';

import { ICatObject } from 'types/types';
import './CatItem.scss';

export class CatItem extends Component<ICatObject> {
  render() {
    return (
      <div className="cat-item-wrapper">
        <span>{this.props.name}</span>
        <div className="cat-image-container">
          <img src={this.props.imageSrc} alt="a cat" />
        </div>
      </div>
    );
  }
}
