/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import { Container, Link, Links } from './Navigation.style';

import dashboard from '../../assets/dashboard.svg';
import monitor from '../../assets/monitor.svg';
import settings from '../../assets/settings.svg';
import users from '../../assets/users.svg';

const items = [
  {
    name: 'dashboard',
    label: 'Dashboard',
    logo: dashboard,
  },
  {
    name: 'users',
    label: 'Users',
    logo: users,
  },
  {
    name: 'configurations',
    label: 'Configurations',
    logo: settings,
  },
  {
    name: 'views',
    label: 'Views',
    logo: monitor,
  },
];

function Navigation(props) {
  return (
    <Container>
      <Links>
        {items.map(l => (
          <Link
            key={l.name}
            onClick={() => props.handleChange(l)}
          >
            {l.label}
          </Link>
          ))}
      </Links>
    </Container>
  );
}

export default Navigation;
