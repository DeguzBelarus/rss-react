import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { HeaderOriginType } from 'types/types';
import './Header.scss';

interface Props {
  origin: HeaderOriginType;
  filterKeyUpdateData?: (key: string) => void;
  filterKey?: string;
}

interface State {
  isSearchMode: boolean;
}

export class Header extends Component<Props, State> {
  state: State = {
    isSearchMode: false,
  };

  searchModeActivator = () => {
    this.setState({
      isSearchMode: true,
    });
  };

  searchModeDeactivator = () => {
    this.setState({
      isSearchMode: false,
    });
  };

  render() {
    const { origin, filterKey, filterKeyUpdateData } = this.props;
    const { isSearchMode } = this.state;
    return (
      <header className={isSearchMode ? 'search-mode-header' : 'header'} data-testid="app-header">
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
              onFocus={this.searchModeActivator}
              onBlur={this.searchModeDeactivator}
              data-testid="app-filter-input"
            />
          </div>
        ) : null}
        <div className="pages-links-container">
          {origin === 'main-page' ? (
            <>
              <span className="current-page-span">Main</span>
              <Link to={'/purchases'} data-testid="purchases-link">
                Purchases
              </Link>
              <Link to={'/about'} data-testid="app-about-us-link">
                About Us
              </Link>
            </>
          ) : null}
          {origin === 'about-page' ? (
            <>
              <Link to={'/'}>Main</Link>
              <Link to={'/purchases'} data-testid="purchases-link">
                Purchases
              </Link>
              <span className="current-page-span">About Us</span>
            </>
          ) : null}
          {origin === 'purchases-page' ? (
            <>
              <Link to={'/'}>Main</Link>
              <span className="current-page-span">Purchases</span>
              <Link to={'/about'} data-testid="app-about-us-link">
                About Us
              </Link>
            </>
          ) : null}
        </div>
      </header>
    );
  }
}
