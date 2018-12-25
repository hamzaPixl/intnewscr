import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from '../helpers/history';
import { PrivateRoute } from '../components/PrivateRoute';
import { Home } from './Home';
import { Login } from './Login';

function App() {
  return (
    <div>
      <div>
        <div>
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/login" component={Login} />
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
