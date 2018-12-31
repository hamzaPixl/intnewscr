import React from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import LoginForm from './Login.form';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(loginUser(username, password)
        .then(() => this.setState({ submitted: true })));
    }
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


const mapStateToProps = state => ({
  loggingIn: state.authentication,
});

export default connect(mapStateToProps)(Login);
