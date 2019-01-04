import React from 'react';

import { login } from '../../services';
import LoginForm from './Login.form';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false,
      loading: false,
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      this.props.history.push('/');
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    this.setState({ loading: true });
    login(username, password)
      .then(() => {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        this.props.history.push(from);
      })
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    return (
      <LoginForm
        {...this.state}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        loggingIn={this.props.loggingIn}
      />
    );
  }
}

export default Login;
