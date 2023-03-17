import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

type HeaderOriginType = 'main-page' | 'about-page';

interface Props {
  origin: HeaderOriginType;
  filterKeyUpdateData?: (key: string) => void;
  filterKey?: string;
}

export class Header extends Component<Props> {
  render() {
    return (
      <header>
        {this.props.origin === 'main-page' &&
        this.props.filterKeyUpdateData !== undefined &&
        this.props.filterKey !== undefined ? (
          <div className="filter-input-container">
            <input
              type="text"
              className="filter-input"
              placeholder="Enter a cat name..."
              value={this.props.filterKey}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.props.filterKeyUpdateData?.(event.target.value || '')
              }
            />
          </div>
        ) : null}
        <div className="pages-links-container">
          {this.props.origin === 'main-page' ? (
            <>
              <span className="current-page-span">Main</span>
              <Link to={'/about'}>About Us</Link>
            </>
          ) : (
            <>
              <Link to={'/'}>Main</Link>
              <span className="current-page-span">About Us</span>
            </>
          )}
        </div>
      </header>
    );
  }
}
