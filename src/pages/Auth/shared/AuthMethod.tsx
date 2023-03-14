import { GoogleLogin } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';
import { routeNames } from '../../../routes';
import accountStore from '../../../store/AccountStore';
import { observer } from 'mobx-react-lite';

export const AuthMethod = observer(() => {
  const setInCookies = (credential: string) => {
    accountStore.setAccessToken(credential);
    accountStore.loadAccount();
  };
  console.log(accountStore.accessToken && !accountStore.isLoggedIn);

  if (accountStore.accessToken && !accountStore.isLoggedIn)
    return <Navigate to={routeNames.createAccount} />;

  if (accountStore.isLoggedIn) {
    return <Navigate to={routeNames.home} />;
  }
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
});
