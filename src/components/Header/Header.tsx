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
    const { origin, filterKey, filterKeyUpdateData } = this.props;
    return (
      <header data-testid="app-header">
        {origin === 'main-page' && filterKeyUpdateData !== undefined && filterKey !== undefined ? (
          <div className="filter-input-container">
            <input
              type="text"
              className="filter-input"
              placeholder="Enter a cat name..."
              value={filterKey}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                filterKeyUpdateData?.(event.target.value || '')
              }
              data-testid="app-filter-input"
            />
          </div>
        ) : null}
        <div className="pages-links-container">
          {origin === 'main-page' ? (
            <>
              <span className="current-page-span">Main</span>
              <Link to={'/about'} data-testid="app-about-us-link">
                About Us
              </Link>
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
