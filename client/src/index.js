import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <MuiThemeProvider>
    <IntlProvider locale="en">
    <Router>
    </Router>
    </IntlProvider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
