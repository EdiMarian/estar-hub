import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers'
import { logout } from '@multiversx/sdk-dapp/utils';
import { Button } from 'react-bootstrap';
import { walletConnectV2ProjectId, ESTAR_API } from '../../../config';
import { ConnectWithAddress } from './ConnectWithAddress';
import { observer } from 'mobx-react-lite';
import accountStore from '../../../store/AccountStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { RequestStatus } from '../../../types/enums';

export const LinkAddress = () => {
    const { address } = useGetAccountInfo();
    const [show, setShow] = useState(false);

    if(!show) return <div>
        <h1>You don't have address linked!</h1>
        <Button onClick={() => setShow(true)}>Link</Button>
    </div>
    
  return <DappProvider environment={'mainnet'}
  customNetworkConfig={{
    name: 'customConfig',
    apiTimeout: 10000,
    walletConnectV2ProjectId
  }} >
    {
        !Boolean(address) ? (
            <ConnectWithAddress />
        ) : (
            <LinkAddressComponent address={address} />
        )
    }
  </DappProvider>
}

const LinkAddressComponent = observer(({address}: {address?: string}) => {
    const { isLoggedIn, haveAddressAssociated } = accountStore;
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const linkAddress = async () => {
        setLoading(true);
        if(!isLoggedIn) navigate('/login');
        if(haveAddressAssociated) {
            setError('You have an address linked!');
            return;
        }

        const { data } = await axios.post(ESTAR_API + '/users/' + accountStore.account?._id + '/linkAddress', {
            address
        })
        if(data.status === RequestStatus.Success) {
            accountStore.loadAccount();
            logout()
        }
        setLoading(false);
    }

    return <div>
    <h4>You're connected with:</h4>
    <p>{address}</p>
    <p>Are you sure you want to link this address?</p>
    <Button variant='success' onClick={linkAddress}>Confirm</Button>
    <Button variant='danger' onClick={() => logout()} className="mx-2" disabled={loading}>Link another address</Button>
</div>
});
