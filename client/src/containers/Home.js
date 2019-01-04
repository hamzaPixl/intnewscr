import React from 'react';
import Admin from './Admin';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
    };
  }

  render() {
    const { user } = this.state;
    if (user.role === 'admin') {
      return <Admin />;
    }
    return (<div>Hello client</div>);
  }
}

export default Home;
