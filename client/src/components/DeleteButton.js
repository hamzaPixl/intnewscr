import React, { Component } from 'react';
import { Button, Icon, Modal, Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    const Trigger = this.props.trigger;

    return (
      <Modal
        basic
        open={this.state.open}
        onOpen={this.openModal}
        onClose={this.closeModal}
        size="tiny"
        trigger={
          Trigger ? (
            <Trigger
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ) : (
            <Segment
              as={Button}
              icon="trash"
              fluid
              basic
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          )
        }
      >
        <Modal.Header>{this.props.modalTitle}</Modal.Header>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={this.closeModal}>
            <Icon name="remove" />
            <FormattedMessage id="no" defaultMessage="No" />
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              this.props.onClick(this.props.id);
              this.closeModal();
            }}
          >
            <Icon name="checkmark" />
            <FormattedMessage id="yes" defaultMessage="Yes" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeleteButton;
