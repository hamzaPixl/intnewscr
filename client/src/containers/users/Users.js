import React from 'react';
import { Container, Title, Table } from '../../components';
import { getAllUsers } from '../../services';
import history from '../../helpers/history';
import { getParams } from '../../helpers/request';

const model = {
  id: { title: 'User id' },
  role: { title: 'Role' },
  firstName: { title: 'First Name' },
  lastName: { title: 'Last Name' },
  email: { title: 'Email' },
};


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

  render() {
    return (
      <Container className="page">
        <Title id="title.users" defaultMessage="Users" />
        <Table
          model={model}
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
