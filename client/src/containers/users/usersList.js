import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Segment, Label } from 'semantic-ui-react';

import { Container, Title, Table, DeleteButton, CreateButton } from '../../components';
import history from '../../helpers/history';
import { getAllUsers, deleteUser, addUser } from '../../services';
import { getParams } from '../../helpers/request';

import UserForm from './user.form';
import userValidator from './user.validator';

const model = handleDelete => ({
  id: {
    title: 'User id',
    format: (value, rowData) => (
      <Label color="teal" horizontal>
        {rowData.id}
      </Label>
    ),
    width: 1,
  },
  firstName: { title: 'First Name' },
  lastName: { title: 'Last Name' },
  email: { title: 'Email' },
  role: {
    title: 'Role',
    format: (value, rowData) => {
      if (rowData.role === 'admin') {
        return (<Label as="a" color="red" tag>Admin</Label>);
      }
      return (<Label as="a" color="teal" tag>Client</Label>);
    },
    width: 1,
  },
  delete: {
    title: <FormattedMessage id="users.delete" defaultMessage="Delete" />,
    format: (value, rowData) => (
      <DeleteButton
        id={rowData.id}
        onClick={handleDelete}
        modalTitle={
          <FormattedMessage
            id="collection.list.button.delete.header"
            defaultMessage="Are you sure you want to delete this user {collectionId}"
            values={{
              collectionId: rowData.id,
            }}
          />
        }
      />
    ),
    width: 1,
  },
});

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: getParams(this.props.location).page || 1,
        pages: 1,
      },
      sorting: {},
      users: [],
      showCreateForm: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.findUsers = this.findUsers.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  componentDidMount() {
    this.findUsers();
  }

  findUsers() {
    return getAllUsers(this.props.location.search)
      .then((data) => {
        this.setState({ pagination: { page: data.page, pages: data.pages } });
        this.setState({ users: data.docs });
      });
  }

  handlePageChange(e, elm) {
    const page = elm.activePage;
    history.push({ pathname: '/users', search: `page=${page}` });
    this.findUsers();
  }

  handleDelete(id) {
    deleteUser(id)
      .then(() => this.findUsers());
  }

  handleCreate() {
    this.setState({ showCreateForm: !this.state.showCreateForm });
  }

  createUser(user) {
    addUser(user)
      .then(() => {
        this.setState({ showCreateForm: !this.state.showCreateForm });
        return this.findUsers();
      })
      .catch(() => { });
  }

  render() {
    return (
      <Container className="page">
        <div>
          <Title id="title.users" defaultMessage="Users" />
          <CreateButton onClick={this.handleCreate} open={this.state.showCreateForm} />
        </div>
        {this.state.showCreateForm && (
          <Segment secondary>
            <UserForm
              actionLabel={<FormattedMessage id="create" defaultMessage="Create" />}
              onSubmit={this.createUser}
              validate={userValidator}
            />
          </Segment>
        )}
        <Table
          model={model(this.handleDelete)}
          docs={this.state.users}
          onRowClick={({ id }) => { return this.props.history.push(`${this.props.history.location.pathname}/${id}`); }}
          pagination={this.state.pagination}
          handlePageChange={this.handlePageChange}
          sorting={this.state.sorting}
        />
      </Container>
    );
  }
}

export default Users;
