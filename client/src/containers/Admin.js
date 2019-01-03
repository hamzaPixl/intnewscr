import React from 'react';
import Navigation from './navigation/Navigation';
import StatusBar from './statusBar/StatusBar';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
    };
  }

  render() {
    return (
      <div>
        <StatusBar user={this.state.user} />
        <Navigation user={this.state.user} />
      </div>
    );
  }
}

export default Admin;
