import React, { Component } from 'react';

import { Header } from 'components/Header/Header';
import { ICatObject } from 'types/types';
import { catsData } from 'catsData';
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
    if (prevState.filterKey !== this.state.filterKey) {
      this.setState({
        filteredCatsData: catsData.filter((catObject) => catObject.name === this.state.filterKey),
      });
    }
  }

  render() {
    return (
      <>
        <Header
          origin="main-page"
          filterKeyUpdateData={this.filterKeyUpdateData}
          filterKey={this.state.filterKey}
        />
        <div className="main-page-wrapper">MainPage works!</div>
      </>
    );
  }
}
