import React, { Component } from 'react';

import { AppRouter } from 'AppRouter/AppRouter';
import { Header } from './Header/Header';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <AppRouter />
      </>
    );
  }
}

export default App;
