import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';


const ErrorContainer = styled.div`
  padding: 4px;
  visibility: hidden;

  > span {
    color: #912d2b;
  }

  &.visible {
    visibility: visible;
  }
`;

export default class Error extends PureComponent {
  render() {
    return (
      <ErrorContainer
        className={classNames({
          error: true,
          visible: this.props.submitFailed,
        })}
      >
        {this.props.error && (
          <FormattedMessage {...this.props.error} tagName="span" />
        )}
      </ErrorContainer>
    );
  }
}
