import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../theme';

const Container = styled.div`
  background-color: ${props => props.theme.bodyColor};
  height: 100%;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: theme.light,
    };
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <Container>
            Hello world
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
