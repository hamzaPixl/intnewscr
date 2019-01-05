import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Input } from '../../components';
import { Container, Footer, Form, FormContainer, FormTitle, Submit, Background, Error } from './Login.style';
import loginBackground from '../../assets/login.svg';

function LoginForm({
  onSubmit, onChange, username, password, error,
}) {
  return (
    <Container>
      <FormContainer>
        <Background src={loginBackground} alt="Background" />
        <Form onSubmit={onSubmit}>
          <FormTitle>
            <FormattedMessage id="loginTitle" defaultMessage="Welcome at Intnewscr" />
          </FormTitle>
          <Input
            padding="0px 0px 50px 0px"
            margin="0px 0px 20px 0px"
            id="username"
            label="User name"
            labelId="username"
            input={{ name: 'username', onChange, value: username }}
          />
          <Input
            margin="0px 0px 20px 0px"
            padding="0px 0px 50px 0px"
            id="password"
            label="Password"
            labelId="password"
            name="password"
            type="password"
            input={{ name: 'password', onChange, value: password }}
          />
          <Submit>
            <FormattedMessage id="login.signIn" defaultMessage="Sign in" />
          </Submit>
          {typeof error === 'string' && <Error>{error}</Error>}
        </Form>
      </FormContainer>
      <Footer>INTNEWSCR</Footer>
    </Container>
  );
}

export default LoginForm;
