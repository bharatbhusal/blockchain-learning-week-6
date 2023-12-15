import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/useAppContext'

const Account = () => {
    const { userAccount, chainId, provider } = useAppContext()
    const [chainName, setChainName] = useState()

    useEffect(() => {
        const fetchChainName = async () => {
            try
            {
                const network = await provider.getNetwork(chainId);
                setChainName(network.name);
            } catch (error)
            {
                console.error('Error fetching chain name:', error);
                setChainName('Unknown');
            }
        };

        fetchChainName();
    }, [chainId]);

    return (
        <>{userAccount && chainId &&
            <div className="account">
                <div className="wallet">
                    Wallet: {userAccount.slice(0, 10) + "...." + userAccount.slice(35,)}
                </div>
                <div className="chain">
                    Chain: {chainName[0].toUpperCase() + chainName.slice(1,)}
                </div>
            </div>}
        </>
    )
}

export default Account