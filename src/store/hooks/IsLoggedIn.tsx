import { useContext } from 'react';
import { AccountContext } from '../Account';

const IsLoggedIn = () => {
    const {account} = useContext(AccountContext);
    return Boolean(account.email);
}

export {IsLoggedIn}