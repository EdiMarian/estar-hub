import { createContext, useEffect, useState } from 'react';
import { IAccountContext, IAccount } from './types';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ESTAR_API } from '../config';

const default_account_values = {
    username: '',
    email: '',
    address: '',
    eStatus: '', 
    status: '',
  }

export const AccountContext = createContext<IAccountContext>({
  account: default_account_values,
  setAccessToken: (arg: string) => {}
});

export const AccountProvider = ({ children }: { children: JSX.Element }) => {
  const [account, setAccount] = useState<IAccount>(default_account_values);
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const access_token = Cookies.get('access_token');
    if(access_token) setAccessToken(access_token);
  }, [])

  const getAccountOrCreate = async () => {
    try {
        const {data} = await axios.get(ESTAR_API+ '/users/access_token/' + accessToken);
        if(data.status === 'SUCCESS') setAccount(data.data)
        else console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if(!accessToken) {
      setAccount(default_account_values);
      return;
    };

    getAccountOrCreate()
  }, [accessToken])

  return (
    <AccountContext.Provider value={{ account, setAccessToken }}>
      {children}
    </AccountContext.Provider>
  );
};