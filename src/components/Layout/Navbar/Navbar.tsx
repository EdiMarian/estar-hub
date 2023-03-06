import React from 'react';
import { Navbar as NavbarBootstrap, Nav } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../../assets/svgs/logo.svg';
import { routeNames } from '../../../routes';
import { Link } from 'react-router-dom';
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IsLoggedIn, useGetAccount } from '../../../store';
import { googleLogout } from '@react-oauth/google';
import Cookies from 'js-cookie';

export const Navbar = () => {
  const isLoggedIn= IsLoggedIn();
  const {setAccessToken} = useGetAccount()

  const logOut = () => {
    googleLogout();
    Cookies.remove('access_token');
    setAccessToken('');
  }

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
          {isLoggedIn ? <>
            <Nav.Item>
            <Link to={routeNames.account} className='nav-link'>
                <FontAwesomeIcon icon={faUser} />
              </Link>
          </Nav.Item>
          <Nav.Item>
            <div  className='nav-link' onClick={logOut}><FontAwesomeIcon icon={faPowerOff}/></div>
          </Nav.Item>
          </>
            
          :  <Nav.Item>
          <Link to={routeNames.login} className='nav-link'>
                Login
              </Link>
        </Nav.Item>}
        </Nav>
      </NavbarBootstrap.Collapse>
    </NavbarBootstrap>
  );
};
