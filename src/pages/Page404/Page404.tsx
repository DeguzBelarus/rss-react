import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Page404.scss';

export class Page404 extends Component {
  render() {
    return (
      <div className="page-404-wrapper">
        <h1>This page doesn&apos;t exist</h1>
        <Link to={'/'} className="">
          To the main page
        </Link>
      </div>
    );
  }
}
