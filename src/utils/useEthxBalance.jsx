import { useContext, useEffect, useState } from 'react';
import { ethers } from "ethers"
import { useAppContext } from '../context/useAppContext';

export const useEthxBalance = () => {

    const { signer, ethxContract, chainId } = useAppContext()
    const [ethxBalance, setEthxBalance] = useState(0);

    const fetchBalance = async () => {
        try
        {
            const balance = await ethxContract.balanceOf(signer.address);
            const balanceInEther = ethers.formatEther(balance);
            const formattedBalance = parseFloat(balanceInEther).toFixed(6);
            console.log("MY FORMATTED BALANCE ", formattedBalance)
            setEthxBalance(formattedBalance.toString());
        } catch (error)
        {
            console.error("Error fetching balance:", error);
        }
    };

    const updateBalance = async () => {
        if (ethxContract && signer && chainId == 5)
        {
            await fetchBalance();
        } else
        {
            setEthxBalance(0);
        }
    };

    // useEffect(() => {
    //     updateBalance();
    // }, [ethxContract, signer, chainId]);

    return { ethxBalance, updateBalance };
};
