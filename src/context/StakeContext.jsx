import { createContext, useEffect, useState } from "react";
import { connectWallet } from "../connectWallet"

export const StakeContext = createContext()

export const StakeContextProvider = ({ children }) => {

    const [state, setState] = useState({
        provider: null,
        account: null,
        stakingContract: null,
        withdrawContract: null,
        ethxContract: null,
        chainId: null,
    });


    useEffect(() => {
        const handleWallet = async () => {
            try
            {
                const { provider, selectedAccount, stakingContract, withdrawContract, ethxContract, chainId } = await connectWallet();
                // console.log(stakingContract, selectedAccount, ethxContract)
                setState({ provider, selectedAccount, stakingContract, withdrawContract, ethxContract, chainId });
            } catch (error)
            {
                console.error(error.message);
            }
        };
        handleWallet()
    }, [])


    return (
        <StakeContext.Provider value={state}>
            {children}
        </StakeContext.Provider>
    );
}

