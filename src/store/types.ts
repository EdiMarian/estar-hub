export interface IAccountContext {
  account: Account;
  setAccessToken: (arg: string) => void;
}

export class Account {
  _id: string | null;
  username: string | null;
  email: string | null;
  address: string | null;
  eStatus: string | null;
  status: string | null;
  badges?: Badges;
  horses?: Horses;
  inventory?: Inventory;
  profile?: Profile;

  constructor(account: Account) {
    this._id = account._id;
    this.username = account.username;
    this.email = account.email;
    this.address = account.address;
    this.eStatus = account.eStatus;
    this.status = account.status;
    this.badges = account.badges;
    this.horses = account.horses;
    this.inventory = account.inventory;
    this.profile = account.profile;
  }
}

interface Badges {
  _id: string;
  badges: string[];
}

interface Horses {
  _id: string;
  horses: string[];
}

interface Inventory {
  _id: string;
  items: [];
}

interface Profile {
  _id: string;
  jockeyScore: number;
  level: number;
  power: number;
  rank: number;
  xp: number;
}