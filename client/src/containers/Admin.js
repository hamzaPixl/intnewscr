import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './dashboard/Dashboard';
import Configurations from './configurations/Configurations';
import Views from './views/Views';

import usersList from './users/usersList';
import userEdit from './users/userEdit';

export const ComponentContainer = styled.div`
  margin: 35px;
  width: 100%;
`;

function Admin() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/configurations" component={Configurations} />
      <Route path="/views" component={Views} />
      <Route path="/users/:userId" component={userEdit} />
      <Route path="/users" component={usersList} />
      <Redirect from="/" to="/dashboard" />
    </Switch>
  );
}

export default Admin;
