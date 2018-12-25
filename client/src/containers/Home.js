import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Home () {
  const { user } = this.props;
  return (
    <div>
      <h1>Hi {user.firstName}!</h1>
      <p>You are logged !</p>
      <p>
        <Link to="/login">Logout</Link>
      </p>
    </div>
  );
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users,
  };
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };
