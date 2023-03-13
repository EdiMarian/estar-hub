import React from 'react';
import { Navbar as NavbarBootstrap, Nav } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../../assets/svgs/logo.svg';
import { routeNames } from '../../../routes';
import { Link } from 'react-router-dom';
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import accountStore from '../../../store/AccountStore';

export const Navbar = observer(() => {
  const { isLoggedIn } = accountStore;
  return (
    <NavbarBootstrap expand='lg' className='px-md-5'>
      <Link to={routeNames.home}>
        <Logo className='nav-logo' />
      </Link>
      <NavbarBootstrap.Toggle aria-controls='basic-navbar-nav' />
      <NavbarBootstrap.Collapse className='justify-content-end'>
        <Nav>
          <Nav.Item>
            <Link to={routeNames.home} className='nav-link'>
              Home
            </Link>
          </Nav.Item>
          {isLoggedIn ? (
            <>
              <Nav.Item>
                <Link to={routeNames.account} className='nav-link'>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </Nav.Item>
              <Nav.Item>
                <div className='nav-link' onClick={() => accountStore.logOut()}>
                  <FontAwesomeIcon icon={faPowerOff} />
                </div>
              </Nav.Item>
            </>
          ) : (
            <Nav.Item>
              <Link to={routeNames.login} className='nav-link'>
                Login
              </Link>
            </Nav.Item>
          )}
        </Nav>
      </NavbarBootstrap.Collapse>
    </NavbarBootstrap>
  );
});
