import { createContext, useState, useEffect } from 'react';
import stakingAbi from '../ABI/stakingAbi.json';
import withdrawAbi from '../ABI/withdrawAbi.json';
import ethxAbi from '../ABI/ethxAbi.json';
import { ethers, Contract } from 'ethers';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [signer, setSigner] = useState(null);
    const [chainId, setChainId] = useState('chainId');
    const [ethBalance, setEthBalance] = useState(null);
    const [ethxBalance, setEthxBalance] = useState(null);
    const [stakingContract, setStakingContract] = useState(null);
    const [withdrawContract, setWithdrawContract] = useState(null);
    const [ethxContract, setEthxContract] = useState(null);

    const state = {
        signer,
        setSigner,
        chainId,
        setChainId,
        ethBalance,
        ethxBalance,
        setEthxBalance,
        setEthBalance,
        stakingContract,
        setStakingContract,
        withdrawContract,
        setWithdrawContract,
        ethxContract,
        setEthxContract,
    };

    useEffect(() => {
        // Event listeners for account and chain changes
        const handleAccountChange = () => handleSignerChange(setSigner);
        const handleChainChange = () => handleChainChange(setChainId);

        window.ethereum.on('accountChanged', handleAccountChange);
        window.ethereum.on('chainChanged', handleChainChange);

        return () => {
            // Cleanup event listeners
            window.ethereum.removeListener('accountChanged', handleAccountChange);
            window.ethereum.removeListener('chainChanged', handleChainChange);
        };
    }, []);

    useEffect(() => {
        // Create contract instances when signer is updated
        const createContract = (abi, signer, address) => new Contract(address, abi, signer);

        setStakingContract(createContract(stakingAbi, signer, '0xd0e400Ec6Ed9C803A9D9D3a602494393E806F823'));
        setWithdrawContract(createContract(withdrawAbi, signer, '0x1048Eca024cB2Ba5eA720Ac057D804E95a809Fc8'));
        setEthxContract(createContract(ethxAbi, signer, '0x3338eCd3ab3d3503c55c931d759fA6d78d287236'));
    }, [signer]);

    useEffect(() => {
        // Fetch and update ETH balance when signer changes
        const returnEthBalance = async () => {
            setEthBalance(ethers.formatEther(await signer.provider.getBalance(signer.address)));
        };

        if (signer)
        {
            returnEthBalance();
        }
    }, [signer]);

    useEffect(() => {
        // Fetch and update ETHx balance when ethxContract changes
        const returnEthxBalance = async () => {
            const contract = new Contract('0x3338eCd3ab3d3503c55c931d759fA6d78d287236', ethxAbi, signer);
            setEthxBalance(ethers.formatEther(await contract.balanceOf(signer.address)));
        };

        if (signer)
        {
            returnEthxBalance();
        }
    }, [ethxContract, signer]);

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    );
};
