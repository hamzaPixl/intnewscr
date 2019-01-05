import React from 'react';
import Navigation from './navigation/Navigation';
import StatusBar from './statusBar/StatusBar';
import { Container } from '../components';
import Admin from './Admin';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
    };
    this.renderAdmin = this.renderAdmin.bind(this);
  }

  renderAdmin() {
    return (
      <div style={{ height: '100%' }}>
        <StatusBar user={this.state.user} />
        <Container className="full">
          <Navigation user={this.state.user} />
          <Admin />
        </Container>
      </div>
    );
  }

  render() {
    const { user } = this.state;
    return (user.role === 'admin' ? this.renderAdmin() : <div>Hello client</div>);
  }
}

export default Home;
