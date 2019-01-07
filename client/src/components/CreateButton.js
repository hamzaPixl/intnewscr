import React, { PureComponent } from 'react';
import { Button } from 'semantic-ui-react';

export default class CreateButton extends PureComponent {
  render() {
    return (
      <Button
        className="addButton"
        color="green"
        onClick={this.props.onClick}
        icon={this.props.open ? 'minus' : 'add'}
        content="Create"
      />
    );
  }
}
