import { observer } from 'mobx-react-lite';
import accountStore from '../../store/AccountStore';
import { Navigate } from 'react-router-dom';
import { routeNames } from '../../routes';
import { Loading } from '../../components/Loading';
import { LinkAddress } from './components/LinkAddress';

export const Account = observer(() => {
  const { isLoggedIn, isLoading, haveAddressAssociated } = accountStore;
  if(isLoading) return <Loading loadingText='Fetching account...' />
  if (!isLoggedIn) return <Navigate to={routeNames.login} />;
  return <>
    {!haveAddressAssociated && <LinkAddress />}
  </>;
});
