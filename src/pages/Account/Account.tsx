import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { routeNames } from '../../routes';
import accountStore from '../../store/AccountStore';

export const Account = observer(() => {
  const { isLoggedIn } = accountStore;
  if(!isLoggedIn) return <Navigate to={routeNames.login}/>
  return <div>h1</div>;
});
