import { createContext, useState, useEffect } from "react";
import stakingAbi from "../ABI/stakingAbi.json"
import withdrawAbi from "../ABI/withdrawAbi.json"
import ethxAbi from "../ABI/ethxAbi.json"
import { ethers, Contract } from "ethers"
export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [signer, setSigner] = useState(null);
    const [chainId, setChainId] = useState("chainId")
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

    // useEffect(() => {
    //     const returnSigner = async () => {
    //         const provider = new ethers.BrowserProvider(window.ethereum)
    //         return await provider.getSigner()
    //     }
    //     returnSigner()
    // }, [signer])

    useEffect(() => {
        const createContract = (abi, signer, address) => {
            return new Contract(address, abi, signer)
        }
        setStakingContract(createContract(stakingAbi, signer, "0xd0e400Ec6Ed9C803A9D9D3a602494393E806F823")) //staking contract

        setWithdrawContract(createContract(withdrawAbi, signer, "0x1048Eca024cB2Ba5eA720Ac057D804E95a809Fc8")) //withdraw contract

        setEthxContract(createContract(ethxAbi, signer, "0x3338eCd3ab3d3503c55c931d759fA6d78d287236")) //ethx contract
    }, [signer])

    useEffect(() => {
        const returnEthBalance = async () => {
            setEthBalance(ethers.formatEther(await signer.provider.getBalance(signer.address)))
        }
        returnEthBalance()
    }, [signer])

    useEffect(() => {
        const returnEthxBalance = async () => {
            setEthxBalance(ethers.formatEther(await ethxContract.balanceOf(signer.address)))
        }
        if (!ethBalance)
            returnEthxBalance()
    }, [ethxBalance])


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