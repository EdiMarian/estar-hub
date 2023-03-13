import { makeAutoObservable } from 'mobx';
import { Account } from './types';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ESTAR_API } from '../config';
import { googleLogout } from '@react-oauth/google';

class AccountStore {
    account?: Account;

    constructor() {
        makeAutoObservable(this);
    }

    async loadAccount(): Promise<void> {
        const access_token = Cookies.get('access_token');
        try {
            const { data } = await axios.get(ESTAR_API + '/users/access_token/' + access_token);
            if(data.status === 'SUCCESS') {
                const account: Account = data.data;
                this.account = new Account(account);
            }
        } catch (error) {
            console.log(error)
        }
    }

    get isLoggedIn(): boolean {
        return this.account != null;
    }

    logOut(): void {
        googleLogout();
        Cookies.remove('access_token');
        this.account = undefined;
    }

    get haveAddressAssociated(): boolean {
        return this.account?.address != null;
    }
}

const accountStore = new AccountStore();

export default accountStore;