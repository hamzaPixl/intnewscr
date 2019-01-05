/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import { Container, LinkStyled, Links, Logo } from './Navigation.style';

import dashboard from '../../assets/dashboard.svg';
import monitor from '../../assets/monitor.svg';
import settings from '../../assets/settings.svg';
import users from '../../assets/users.svg';

const items = [
  {
    name: 'dashboard',
    path: '/dashboard',
    label: 'Dashboard',
    logo: dashboard,
  },
  {
    name: 'users',
    path: '/users',
    label: 'Users',
    logo: users,
  },
  {
    name: 'configurations',
    path: '/configurations',
    label: 'Configurations',
    logo: settings,
  },
  {
    name: 'views',
    path: '/views',
    label: 'Views',
    logo: monitor,
  },
];

function Navigation() {
  return (
    <Container>
      <Links>
        {items.map(l => (
          <LinkStyled
            key={l.name}
            to={l.path}
          >
            <Logo src={l.logo} />
          </LinkStyled>
          ))}
      </Links>
    </Container>
  );
}

export default Navigation;
