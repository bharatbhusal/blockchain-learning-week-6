import { createContext, useState, useEffect } from "react";
import { connectWallet } from "../utils/connectWallet";
export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
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
                setState({ provider, selectedAccount, stakingContract, withdrawContract, ethxContract, chainId });
            } catch (error)
            {
                console.error(error.message);
            }
        };

        handleWallet();
    }, [])

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}