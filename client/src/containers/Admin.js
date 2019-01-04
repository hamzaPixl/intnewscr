import React from 'react';
import styled from 'styled-components';
import Navigation from './navigation/Navigation';
import StatusBar from './statusBar/StatusBar';

import Dashboard from './dashboard/Dashboard';
import { Container } from '../components';

export const ComponentContainer = styled.div`
  margin: 35px;
  width: 100%
`;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.changeComponent = this.changeComponent.bind(this);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      component: <Dashboard />,
    };
  }

  changeComponent(item) {
    this.setState({ component: item.component });
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <StatusBar user={this.state.user} />
        <Container className="full">
          <Navigation handleChange={this.changeComponent} user={this.state.user} />
          <ComponentContainer>
            {this.state.component}
          </ComponentContainer>
        </Container>
      </div>
    );
  }
}

export default Admin;
