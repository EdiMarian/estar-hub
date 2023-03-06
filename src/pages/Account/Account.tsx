import { Navigate } from 'react-router-dom';
import { IsLoggedIn, useGetAccount } from '../../store';
import { routeNames } from '../../routes';

export const Account = () => {
  const isLoggedIn = IsLoggedIn();

  if(!isLoggedIn) return <Navigate to={routeNames.login}/>
  return <div>Account</div>;
};
