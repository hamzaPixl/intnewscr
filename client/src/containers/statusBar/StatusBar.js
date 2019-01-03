import React from 'react';
import { Container, AppName, Avatar, User, Logout, UserPart } from './StatusBar.style';
import { logout } from '../../services/authService';
import LogoutSvg from '../../assets/logout.svg';
import UserSvg from '../../assets/user.svg';

function StatusBar(props) {
  return (
    <Container>
      <AppName>Interactive News Screen</AppName>
      <UserPart>
        <Avatar src={UserSvg} />
        <User>{`${props.user.firstName} ${props.user.lastName}`}</User>
        <Logout src={LogoutSvg} onClick={() => logout()} />
      </UserPart>
    </Container>
  );
}

export default StatusBar;
