export interface IAccountContext {
    account: IAccount;
    setAccessToken: (arg: string) => void,
}

export interface IAccount {
    username: string,
    email: string;
    address: string,
    eStatus: string, 
    status: string,
}