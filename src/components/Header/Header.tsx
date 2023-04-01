import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { HeaderOriginType } from 'types/types';
import './Header.scss';

interface Props {
  origin: HeaderOriginType;
  filterKeyUpdateData?: (key: string) => void;
  filterKey?: string;
}

export const Header: FC<Props> = ({ origin, filterKey, filterKeyUpdateData }) => {
  const [isSearchMode, setIsSearchMode] = useState(false);

  const searchModeActivator = () => {
    setIsSearchMode(true);
  };

  const searchModeDeactivator = () => {
    setIsSearchMode(false);
  };

  const searchPropsAvailabilityCheck = (): boolean => {
    return filterKeyUpdateData !== undefined && filterKey !== undefined ? true : false;
  };
  return (
    <header className={isSearchMode ? 'search-mode-header' : undefined} data-testid="app-header">
      {origin === 'main-page' && searchPropsAvailabilityCheck() ? (
        <div className="filter-input-container">
          <input
            type="text"
            className="filter-input"
            placeholder="Enter a cat name..."
            value={filterKey}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              filterKeyUpdateData?.(event.target.value || '')
            }
            onFocus={searchModeActivator}
            onBlur={searchModeDeactivator}
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
};
