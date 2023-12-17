import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import useAppContext from '../context/useAppContext';

const Balance = () => {
    const { user, provider, setEthBalance } = useAppContext()
    const [balanceEth, setBalanceEth] = useState(0)

    useEffect(() => {
        const fetchBalance = async () => {
            try
            {
                // Ensure that the address and provider are available
                if (user && provider)
                {
                    // Fetch the balance
                    const balanceWei = await provider.getBalance(user);

                    // Convert the balance from Wei to Ether
                    setBalanceEth(ethers.utils.formatEther(balanceWei));

                    // Update the state with the balance
                    setEthBalance(balanceEth);
                }
            } catch (error)
            {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, [user, provider]);
    return (
        <div>
            <p>Address: {user}</p>
            {balanceEth !== null ? <p>Balance: {balanceEth} ETH</p> : <p>Loading balance...</p>}
        </div>
    );
};

export default Balance;
