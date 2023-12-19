import { createContext, useState, useEffect } from "react";
export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [signer, setSigner] = useState(null);
    const [chainId, setChainId] = useState("0x5")
    const [ethBalance, setEthBalance] = useState(null);
    const [ethxBalance, setEthxBalance] = useState(null);
    const [stakingContract, setStakingContract] = useState(null);
    const [withdrawContract, setWithdrawContract] = useState(null);
    const [ethxContract, setEthxContract] = useState(null);

    const state = {
        signer, setSigner, chainId, setChainId, ethBalance,
        ethxBalance, setEthxBalance, setEthBalance, stakingContract, setStakingContract, withdrawContract, setWithdrawContract, ethxContract, setEthxContract
    }

    useEffect(() => {
        window.ethereum.on('accountChanged', () => handleSignerChange(setSigner))
        window.ethereum.on('chainChanged', () => handleChainChange(setChainId))

        return () => {
            window.ethereum.removeListener('accountChanged', () => handleSignerChange(setSigner))
            window.ethereum.removeListener('chainChanged', () => handleChainChange(setChainId))
        }
    }, []);

    const handleSignerChange = async (setSigner) => {

        const newSigner = await window.ethereum.request({
            method: "eth_requestAccounts"
        })

        setSigner(newSigner)
        

    }

    const handleChainChange = async (setChain) => {

        let newChain = await window.ethereum.request({
            method: 'eth_chainId'
        })
        setChain(newChain)
    }

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}