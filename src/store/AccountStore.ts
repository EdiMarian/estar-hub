import { makeAutoObservable } from 'mobx';
import { Account } from './types';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ESTAR_API } from '../config';
import { googleLogout } from '@react-oauth/google';

class AccountStore {
  account?: Account;
  accessToken?: string;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async loadAccount(): Promise<void> {
    this.isLoading = true;
    const access_token = Cookies.get('access_token');
    const { data } = await axios.get(
      ESTAR_API + '/users/access_token/' + access_token
    );
    if (data.status === 'SUCCESS') {
      const account: Account = data.data;
      this.account = new Account(account);
    }
    this.isLoading = false;
  }

  setAccessToken(credential: string): void {
    const date = new Date();
    date.setTime(date.getTime() + 120 * 1000);
    Cookies.set('access_token', credential, { expires: date });
    this.accessToken = credential;
  }

  logOut(): void {
    googleLogout();
    Cookies.remove('access_token');
    this.account = undefined;
  }

  resetAccessToken(): void {
    Cookies.remove('access_token');
    this.accessToken = undefined;
  }

  get getAccessToken(): string | undefined {
    this.accessToken = Cookies.get('access_token');
    return this.accessToken;
  }

  get isLoggedIn(): boolean {
    return this.account != null;
  }

  get haveAddressAssociated(): boolean {
    return this.account?.address != null;
  }
}

const accountStore = new AccountStore();

export default accountStore;
