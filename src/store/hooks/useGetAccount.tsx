import { useContext } from 'react';
import { AccountContext } from '../Account';

const useGetAccount = () => {
  const {account, setAccessToken} = useContext(AccountContext);
  return {account, setAccessToken};
};
export {useGetAccount};