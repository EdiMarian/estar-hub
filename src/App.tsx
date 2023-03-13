import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@multiversx/sdk-dapp/UI';
import { API_TIMEOUT } from './config';
import { DefaultLayout, Layout } from './components';
import { routes } from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import accountStore from './store/AccountStore';
function App() {
  useEffect(() => {
    accountStore.loadAccount();
  }, []);

  return (
    <Router>
      <DappProvider
        environment={EnvironmentsEnum.mainnet}
        customNetworkConfig={{ name: 'customConfig', apiTimeout: API_TIMEOUT }}
      >
        <Layout>
          <TransactionsToastList />
          <NotificationModal />
          <SignTransactionsModals className='custom-class-for-modals' />
          <GoogleOAuthProvider clientId='845043166725-b80hk2r3dio8nfjc7915o9lpfels3ugn.apps.googleusercontent.com'>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  path={route.path}
                  key={'route-key-' + index}
                  element={
                    <DefaultLayout>
                      <route.component />
                    </DefaultLayout>
                  }
                />
              ))}
              {/* <Route path='*' element={<PageNotFound />} /> */}
            </Routes>
          </GoogleOAuthProvider>
        </Layout>
      </DappProvider>
    </Router>
  );
}

export default App;
