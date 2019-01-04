import React from 'react';
import { Router, Route } from 'react-router-dom';
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
        <div style={{ height: '100%' }}>
          <Router history={history}>
            <div style={{ height: '100%' }}>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/login" component={Login} />
            </div>
          </Router>
        </div>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
