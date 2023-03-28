import React, { Component } from 'react';
import { FormMessageType } from 'types/types';

import './FormMessage.scss';

interface Props {
  message: string;
  messageType: FormMessageType;
}

export class FormMessage extends Component<Props> {
  render() {
    const { message, messageType } = this.props;
    return (
      <div className="form-message-wrapper">
        <span className={messageType === 'success' ? 'message-span' : 'message-span error-message'}>
          {message}
        </span>
      </div>
    );
  }
}
