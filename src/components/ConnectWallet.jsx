import React from 'react';
import { ethers } from 'ethers';
import useAppContext from '../context/useAppContext';
import toast from 'react-hot-toast';
import env from '../utils/validateEnv';

import stakingAbi from '../ABI/stakingAbi.json';
import withdrawAbi from '../ABI/withdrawAbi.json';
import ethxAbi from '../ABI/ethxAbi.json';

const ConnectWallet = () => {
    const { setUser, setChainId, setProvider, setStakingContract, setWithdrawContract, setEthxContract, setEthBalance } =
        useAppContext();

    const handleConnection = async () => {
        try
        {
            // Check if MetaMask is installed
            if (typeof window.ethereum !== 'undefined')
            {
                // Use MetaMask's provider
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider);

                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                if (!accounts || !accounts[0])
                {
                    throw new Error('No Ethereum accounts available.');
                }

                const selectedAccount = accounts[0];
                setUser(selectedAccount);

                // Request chainId
                setChainId(await window.ethereum.request({ method: 'eth_chainId' }));

                const signer = provider.getSigner();
                console.log('Connected to MetaMask. Account address:', selectedAccount);

                // Corrected contract instantiations
                setStakingContract(new ethers.Contract(env.REACT_APP_STAKING_CONTRACT, stakingAbi, signer));
                setWithdrawContract(new ethers.Contract(env.REACT_APP_WITHDRAW_CONTRACT, withdrawAbi, signer));
                setEthxContract(new ethers.Contract(env.REACT_APP_ETHX_CONTRACT, ethxAbi, signer));

            } else
            {
                throw new Error('MetaMask not found. Please install MetaMask to use this application.');
            }
        } catch (error)
        {
            console.error('Error connecting to MetaMask:', error);
            toast.error(error.message);
        }
    };

    return (
        <div className="connection">
            <button onClick={handleConnection}>Connect</button>
        </div>
    );
};

export default ConnectWallet;
