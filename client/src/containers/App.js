import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';

import history from '../helpers/history';
import { PrivateRoute } from '../components';
import Home from './Home';
import Login from './login/Login';
import { light } from '../theme';

function App() {
  return (
    <IntlProvider locale="en">
      <ThemeProvider theme={light}>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </Router>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
