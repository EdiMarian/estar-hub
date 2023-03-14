export interface IAccountContext {
  account: Account;
  setAccessToken: (arg: string) => void;
}

export class Account {
  username: string | null;
  email: string | null;
  address: string | null;
  eStatus: string | null;
  status: string | null;

  constructor(account: Account) {
    this.username = account.username;
    this.email = account.email;
    this.address = account.address;
    this.eStatus = account.eStatus;
    this.status = account.status;
  }
}
