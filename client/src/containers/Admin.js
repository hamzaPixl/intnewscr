import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './dashboard/Dashboard';
import Configurations from './configurations/Configurations';
import Views from './views/Views';
import Users from './users/Users';

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
      <Route path="/users" component={Users} />
      <Redirect from="/" to="/dashboard" />
    </Switch>
  );
}

export default Admin;
