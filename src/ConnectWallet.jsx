import { useSDK } from '@metamask/sdk-react';
import React, { useState } from 'react';

export const ConnectWallet = () => {
    const [account, setAccount] = useState();
    const { sdk, connected, connecting, provider, chainId } = useSDK();

    const connect = async () => {
        try
        {
            const accounts = await sdk?.connect();
            setAccount(accounts?.[0]);
            console.log("Wallet disconnected")
        } catch (err)
        {
            console.warn(`failed to connect..`, err);
        }
    };
    const disconnect = async () => {
        try
        {
            sdk?.disconnect();
            setAccount("");
            console.log("Wallet disconnected")
        } catch (err)
        {
            console.warn(`failed to disconnect..`, err);
        }
    };


    return (
        <div className="ConnectWallet">

            {!connected ? <button onClick={connect}>
                Connect
            </button> : <button onClick={disconnect}>Disconnect</button>}
            {/* {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
            
          </>
        </div>
      )} */}
        </div>
    );
};