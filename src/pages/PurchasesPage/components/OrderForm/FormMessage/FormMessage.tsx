import React, { Component } from 'react';

import './FormMessage.scss';

interface Props {
  message: string;
}

export class FormMessage extends Component<Props> {
  render() {
    const { message } = this.props;
    return (
      <div className="form-message-wrapper">
        <span className="message-span">{message}</span>
      </div>
    );
  }
}
