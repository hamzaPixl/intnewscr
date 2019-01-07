import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { ListForm, Container, Title } from '../../components';
import { getUser, updateUser } from '../../services/usersService';

const fields = [
  {
    id: 'user.edit.firstName',
    label: <FormattedMessage id="user.edit.firstName" defaultMessage="First Name" />,
    name: 'firstName',
  },
  {
    id: 'user.edit.lastName',
    label: <FormattedMessage id="user.edit.lastName" defaultMessage="Last Name" />,
    name: 'lastName',
  },
  {
    id: 'user.edit.email',
    label: <FormattedMessage id="user.edit.email" defaultMessage="Email" />,
    name: 'email',
  },
];

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      editable: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getUser(this.props.match.params.userId)
      .then(user => this.setState({ user }));
  }

  handleSubmit(payload) {
    const {
      id, email, firstName, lastName,
    } = payload;

    updateUser(id, {
      email, firstName, lastName,
    })
      .then((user) => {
        this.setState({ user, editable: false });
      });
  }

  render() {
    return (
      <Fragment>
        <Container className="page">
          <Title
            id="user.edit.title"
            defaultMessage="User edit"
          />
          <ListForm
            error={this.props.error}
            fields={fields}
            initialValues={this.state.user}
            onSubmit={this.handleSubmit}
            saving={this.props.saving}
            removeEditable={() => { this.setState({ editable: false }); }}
            toggleEditable={() => { this.setState({ editable: !this.state.editable }); }}
            editable={this.state.editable}
          />
        </Container>
      </Fragment>
    );
  }
}

export default UserEdit;
