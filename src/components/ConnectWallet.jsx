
import React, { useEffect } from 'react'
import { ethers, Contract } from "ethers"
import { useAppContext } from '../context/useAppContext';
import stakingAbi from "../ABI/stakingAbi.json"
import withdrawAbi from "../ABI/withdrawAbi.json"
import ethxAbi from "../ABI/ethxAbi.json"


const ConnectWallet = () => {
    const { setSigner, setChainId, } = useAppContext()


    const returnSigner = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum)
        return await provider.getSigner()
    }

    const checkWalletAppPresence = () => {
        if (window.ethereum === null)
        {
            throw new Error("Wallet not installed")
        }
    }

    const checkWalletAddressPresence = async () => {

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        })

        let selectedAccount = accounts[0]

        if (!selectedAccount)
            throw new Error("No accounts available")
    }

    const returnChainId = async () => {
        return await window.ethereum.request({
            method: "eth_chainId"
        })
    }
    const connectWallet = async () => {
        try
        {
            checkWalletAppPresence()
            await checkWalletAddressPresence()

            setChainId(await window.ethereum.request({
                method: "eth_chainId"
            }))
            setChainId(await returnChainId())

            setSigner(await returnSigner())
        } catch (error)
        {
            console.error(error.message)
        }
    }

    return (
        <div className='connection'>
            {<button style={{ color: "black" }} onClick={connectWallet}>Connect</button>}
        </div>
    )
}

export default ConnectWallet