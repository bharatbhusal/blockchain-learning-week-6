import React from 'react';
import { useAppContext } from '../context/useAppContext';

const Account = () => {
    // Accessing signer and chainId from the AppContext
    const { signer, chainId } = useAppContext();

    // Check if both signer and chainId are available before rendering
    if (!signer || !chainId)
    {
        return null;
    }

    return (
        <div className="account">
            {/* Display wallet address */}
            <div className="wallet">
                Wallet: {`${signer.address.slice(0, 10)}....${signer.address.slice(35)}`}
            </div>

            {/* Display chain information */}
            <div className="chain">
                Chain: {chainId === "0x5" ? "Goerli" : <span style={{ color: "red" }}>Not supported</span>}
            </div>
        </div>
    );
};

export default Account;
