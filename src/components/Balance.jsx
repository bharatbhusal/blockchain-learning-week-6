import React from 'react';
import { useAppContext } from '../context/useAppContext';

const Balance = () => {
    // Accessing ethBalance and ethxBalance from the AppContext
    const { ethBalance, ethxBalance } = useAppContext();

    // Check if both ethBalance and ethxBalance are available before rendering
    if (!ethBalance || !ethxBalance)
    {
        return null;
    }

    return (
        <div className='balance'>
            {/* Display ETH balance */}
            <div className="eth-balance">
                ETH: {ethBalance.slice(0, 10)}
            </div>

            {/* Display ETHx balance */}
            <div className="ethx-balance">
                ETHx: {ethxBalance.slice(0, 10)}
            </div>
        </div>
    );
};

export default Balance;
