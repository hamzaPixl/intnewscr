import React from 'react';
import { Button } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import { Container, Title, Table, DeleteButton } from '../../components';
import history from '../../helpers/history';
import { getAllUsers, deleteUser } from '../../services';
import { getParams } from '../../helpers/request';

const model = handleDelete => ({
  id: { title: 'User id' },
  role: { title: 'Role' },
  firstName: { title: 'First Name' },
  lastName: { title: 'Last Name' },
  email: { title: 'Email' },
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
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.findUsers = this.findUsers.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
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

  render() {
    return (
      <Container className="page">
        <Title id="title.users" defaultMessage="Users" />
        <Button className="addButton" positive icon="add" content="Add a user" />
        <Table
          model={model(this.handleDelete)}
          dataType="pai-drafts"
          docs={this.state.users}
          onRowClick={() => {}}
          pagination={this.state.pagination}
          handlePageChange={this.handlePageChange}
          sorting={this.state.sorting}
        />
      </Container>
    );
  }
}

export default Users;
