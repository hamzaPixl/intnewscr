import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

class SaveButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
    };
    this.handleSaved = this.handleSaved.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const updated = this.props.saving && !nextProps.saving && nextProps.data;
    if (updated && !nextProps.error) {
      this.handleSaved();
    }
  }

  componentWillUnmount() {
    this.props.removeEditable();
  }

  handleSaved() {
    this.setState({ saved: true });
    setTimeout(() => {
      this.setState({ saved: false }, () => {
        if (this.props.onSaved) {
          this.props.onSaved();
        }
      });
    }, 1000);
  }

  render() {
    return this.state.saved ? (
      <Button disabled color="green">
        <Icon name="check" />
        <FormattedMessage id="saved" defaultMessage="Saved" />
      </Button>
    ) : (
      <Button
        disabled={this.props.disabled}
        type="submit"
        loading={this.props.saving}
        color="green"
      >
        <FormattedMessage id="save" defaultMessage="Save" />
      </Button>
    );
  }
}

export default SaveButton;
