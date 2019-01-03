/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import { Container, Link, Links, Logo } from './Navigation.style';

import dashboard from '../../assets/dashboard.svg';
import monitor from '../../assets/monitor.svg';
import settings from '../../assets/settings.svg';
import users from '../../assets/users.svg';

import Dashboard from '../dashboard/Dashboard';
import Configurations from '../configurations/Configurations';
import Views from '../views/Views';
import Users from '../users/Users';

const items = [
  {
    name: 'dashboard',
    label: 'Dashboard',
    logo: dashboard,
    component: <Dashboard />,
  },
  {
    name: 'users',
    label: 'Users',
    logo: users,
    component: <Users />,
  },
  {
    name: 'configurations',
    label: 'Configurations',
    logo: settings,
    component: <Configurations />,
  },
  {
    name: 'views',
    label: 'Views',
    logo: monitor,
    component: <Views />,
  },
];

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: items[0],
    };
    this.selectedItem = this.selectedItem.bind(this);
  }

  selectedItem(item) {
    this.setState({ selected: item });
    this.props.handleChange(item);
  }

  render() {
    return (
      <Container>
        <Links>
          {items.map(l => (
            <Link
              key={l.name}
              className={this.state.selected.name === l.name && 'selected'}
              onClick={() => this.selectedItem(l)}
            >
              <Logo src={l.logo} />
            </Link>
          ))}
        </Links>
      </Container>
    );
  }
}

export default Navigation;
