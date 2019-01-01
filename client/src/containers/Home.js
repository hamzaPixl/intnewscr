import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
    };
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <h1>Hi {user.firstName}!</h1>
      </div>
    );
  }
}

export default Home;
