import { GoogleLogin } from '@react-oauth/google';
import { useGetAccount } from '../../../store';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { routeNames } from '../../../routes';
import { IsLoggedIn } from '../../../store/hooks/IsLoggedIn';

export const AuthMethod = ({method}: {method: 'login' | 'register'}) => {
  const {setAccessToken} = useGetAccount();
  const isLoggedIn = IsLoggedIn()

  const date = new Date();
  date.setTime(date.getTime() + (30 * 1000));

  const setInCookies = (credential: string) => {
    Cookies.set('access_token', credential, {expires: date});
    setAccessToken(credential)
  }

  if(isLoggedIn) return <Navigate to={routeNames.home}/>

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
}
