import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Link } from 'react-router-dom';

import { getSearchKey, setSearchKey, getCatsDataAsync } from 'redux/mainSlice';
import { HeaderOriginType, Nullable } from 'types/types';
import './Header.scss';

interface Props {
  origin: HeaderOriginType;
  currentCatId?: Nullable<number>;
}

export const Header: FC<Props> = ({ origin, currentCatId }) => {
  const dispatch = useAppDispatch();

  const searchKey = useAppSelector(getSearchKey);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const searchModeActivator = () => {
    setIsSearchMode(true);
  };

  const searchModeDeactivator = () => {
    setIsSearchMode(false);
  };

  const searchOnEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(getCatsDataAsync(searchKey));
    }
  };

  return (
    <header className={isSearchMode ? 'search-mode-header' : undefined} data-testid="app-header">
      {origin === 'main-page' && !currentCatId ? (
        <div className="filter-input-container">
          <input
            type="text"
            className="filter-input"
            placeholder="Enter a search key..."
            autoComplete="false"
            value={searchKey}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setSearchKey(event.target.value))
            }
            onFocus={searchModeActivator}
            onBlur={searchModeDeactivator}
            onKeyDown={(event) => searchOnEnterHandler(event)}
            data-testid="app-filter-input"
          />
          <button
            type="button"
            className="search-button"
            onClick={() => dispatch(getCatsDataAsync(searchKey))}
            data-testid="app-search-button"
          >
            &#128269;
          </button>
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
