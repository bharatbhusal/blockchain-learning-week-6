import { createContext, useState, useEffect } from "react";
import { handleSignerChange } from "../utils/handleSignerChange";
import { handleChainChange } from "../utils/handleChainChange";
export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [signer, setSigner] = useState(null);
    const [chainId, setChainId] = useState("0x5")
    const [ethBalance, setEthBalance] = useState(null);
    const [stakingContract, setStakingContract] = useState(null);
    const [withdrawContract, setWithdrawContract] = useState(null);
    const [ethxContract, setEthxContract] = useState(null);

    const state = {
        signer, setSigner, chainId, setChainId, ethBalance, setEthBalance, stakingContract, setStakingContract, withdrawContract, setWithdrawContract, ethxContract, setEthxContract
    }

    useEffect(() => {
        window.ethereum.on('accountChanged', () => handleSignerChange(setSigner))
        window.ethereum.on('chainChanged', () => handleChainChange(setChainId))

        return () => {
            window.ethereum.removeListener('accountChanged', () => handleSignerChange(setSigner))
            window.ethereum.removeListener('chainChanged', () => handleChainChange(setChainId))
        }
    }, []);

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}