import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { routeNames } from '../../../routes';
import accountStore from '../../../store/AccountStore';
import { observer } from 'mobx-react-lite';
import { LinkxPortal } from '../LinkxPortal';

export const AuthMethod = observer(({method}: {method: 'login' | 'register'}) => {

  const date = new Date();
  date.setTime(date.getTime() + (120 * 1000));

  const setInCookies = (credential: string) => {
    Cookies.set('access_token', credential, {expires: date});

    accountStore.loadAccount();
  }

  if(accountStore.isLoggedIn) {
    if(!accountStore.haveAddressAssociated) return <LinkxPortal />;
    return <Navigate to={routeNames.home}/>
  }

  if(method === 'login') return (
    <GoogleLogin onSuccess={(credentialResponse: any) => {
      setInCookies(credentialResponse.credential)
    }} onError={() => {
      console.log('Login Failed');
    }} />
  )

  return (
    <div>register</div>
  )
});
