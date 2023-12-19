import React from 'react';
import { ethers } from 'ethers';
import { useAppContext } from '../context/useAppContext';

const ConnectWallet = () => {
    // Accessing setSigner and setChainId from the AppContext
    const { setSigner, setChainId } = useAppContext();

    // Function to retrieve the signer using the BrowserProvider
    const returnSigner = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        return await provider.getSigner();
    };

    // Function to check the presence of the wallet application
    const checkWalletAppPresence = () => {
        if (window.ethereum === null)
        {
            throw new Error('Wallet not installed');
        }
    };

    // Function to check the presence of the wallet address
    const checkWalletAddressPresence = async () => {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });

        let selectedAccount = accounts[0];

        if (!selectedAccount) throw new Error('No accounts available');
    };

    // Function to retrieve the chain ID
    const returnChainId = async () => {
        return await window.ethereum.request({
            method: 'eth_chainId',
        });
    };

    // Function to connect the wallet
    const connectWallet = async () => {
        try
        {
            // Check if the wallet application is present
            checkWalletAppPresence();

            // Check the presence of the wallet address
            await checkWalletAddressPresence();

            // Using Promise.all to execute asynchronous functions concurrently
            const [chainId, signer] = await Promise.all([
                returnChainId(),
                returnSigner(),
            ]);

            // Set the retrieved chain ID and signer in the AppContext
            setChainId(chainId);
            setSigner(signer);
        } catch (error)
        {
            console.error(error.message);
        }
    };

    return (
        <div className='connection'>
            {/* Use camelCase for style properties */}
            {/* Button to trigger the connectWallet function */}
            <button style={{ color: 'black' }} onClick={connectWallet}>
                Connect
            </button>
        </div>
    );
};

export default ConnectWallet;
