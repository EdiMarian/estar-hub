import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { routeNames } from '../../../routes';
import accountStore from '../../../store/AccountStore';
import { observer } from 'mobx-react-lite';
import { LinkxPortal } from '../LinkxPortal';

export const AuthMethod = observer(
  ({ method }: { method: 'login' | 'register' }) => {
    const setInCookies = (credential: string) => {
      accountStore.setAccessToken(credential);
      accountStore.loadAccount();
    };
    console.log(accountStore.accessToken && !accountStore.isLoggedIn);

    if (accountStore.accessToken && !accountStore.isLoggedIn)
      return <Navigate to={routeNames.createAccount} />;

    if (accountStore.isLoggedIn) {
      if (!accountStore.haveAddressAssociated) return <LinkxPortal />;
      return <Navigate to={routeNames.home} />;
    }

    if (method === 'login')
      return (
        <GoogleLogin
          onSuccess={(credentialResponse: any) => {
            setInCookies(credentialResponse.credential);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      );

    return <div>register</div>;
  }
);
