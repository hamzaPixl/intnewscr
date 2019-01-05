import React from 'react';
import { Image } from 'semantic-ui-react';
import { Container, AppName, Avatar, User, Logout, UserPart } from './StatusBar.style';
import { logout } from '../../services/authService';
import LogoutSvg from '../../assets/logout.svg';

function StatusBar(props) {
  return (
    <Container>
      <AppName>Interactive News Screen</AppName>
      <UserPart>
        <Avatar>
          <Image circular src="https://react.semantic-ui.com/images/avatar/large/patrick.png" />
        </Avatar>
        <User>{`${props.user.firstName} ${props.user.lastName}`}</User>
        <Logout src={LogoutSvg} onClick={() => logout()} />
      </UserPart>
    </Container>
  );
}

export default StatusBar;
