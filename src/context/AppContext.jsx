import { createContext, useState } from "react";
export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [signer, setSigner] = useState(null);
    const [ethBalance, setEthBalance] = useState(null);
    const [ethxBalance, setEthxBalance] = useState(null);
    const [stakingContract, setStakingContract] = useState(null);
    const [withdrawContract, setWithdrawContract] = useState(null);
    const [ethxContract, setEthxContract] = useState(null);

    const state = {
        signer, setSigner, ethBalance, setEthBalance, ethxBalance, setEthxBalance, stakingContract, setStakingContract, withdrawContract, setWithdrawContract, ethxContract, setEthxContract
    }

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}