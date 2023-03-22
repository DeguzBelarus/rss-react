import React, { Component } from 'react';

import { Header } from 'components/Header/Header';
import { ICatObject } from 'types/types';
import { catsData } from 'catsData';
import { CatItem } from './components/CatItem/CatItem';
import './MainPage.scss';

interface State {
  filterKey: string;
  filteredCatsData: Array<ICatObject>;
}
export class MainPage extends Component<object, State> {
  state: State = {
    filterKey: '',
    filteredCatsData: [],
  };

  filterKeyLoadData() {
    if (localStorage.getItem('rss-save')) {
      this.setState({
        filterKey: JSON.parse(localStorage.getItem('rss-save') || ''),
      });
    }
  }

  filterKeyUpdateData = (key: string) => {
    this.setState({ filterKey: key });
    localStorage.setItem('rss-save', JSON.stringify(key));
  };

  componentDidMount(): void {
    this.filterKeyLoadData();
    this.setState({ filteredCatsData: catsData });
  }

  componentDidUpdate(prevProps: object, prevState: Readonly<State>): void {
    const { filterKey } = this.state;
    if (prevState.filterKey !== filterKey) {
      this.setState({
        filteredCatsData: filterKey
          ? catsData.filter((catData) =>
              catData.name.toUpperCase().startsWith(filterKey.toUpperCase())
            )
          : catsData,
      });
    }
  }

  render() {
    const { filterKey, filteredCatsData } = this.state;
    return (
      <>
        <Header
          origin="main-page"
          filterKeyUpdateData={this.filterKeyUpdateData}
          filterKey={filterKey}
        />
        <div className="main-page-wrapper" data-testid="app-main-page">
          {filteredCatsData.length ? (
            filteredCatsData.map((catData) => {
              return (
                <CatItem
                  breed={catData.breed}
                  city={catData.city}
                  id={catData.id}
                  imageSrc={catData.imageSrc}
                  name={catData.name}
                  price={catData.price}
                  key={catData.id}
                />
              );
            })
          ) : (
            <span>{'There are no cats here ;('}</span>
          )}
        </div>
      </>
    );
  }
}
