import { ExtensionLoginButton, LedgerLoginButton, OperaWalletLoginButton, WalletConnectLoginButton, WebWalletLoginButton } from '@multiversx/sdk-dapp/UI'
import { walletConnectV2ProjectId } from '../../../config'
import { routeNames } from '../../../routes'

export const ConnectWithAddress = () => {
    const commonProps = {
        callbackRoute: routeNames.account,
        nativeAuth: true
    }

  return (
    <div>
        <ExtensionLoginButton
              loginButtonText='MultiversX DeFi Wallet'
              {...commonProps}
            />

            <OperaWalletLoginButton
              loginButtonText='Opera Crypto Wallet - Beta'
              {...commonProps}
            />

            <WebWalletLoginButton
              loginButtonText='MultiversX Web Wallet'
              {...commonProps}
            />
            <LedgerLoginButton
              loginButtonText='Ledger'
              className='test-class_name'
              {...commonProps}
            />
            <WalletConnectLoginButton
              loginButtonText='xPortal App'
              {...commonProps}
              {...(walletConnectV2ProjectId
                ? {
                    isWalletConnectV2: true
                  }
                : {})}
            />
    </div>
  )
}