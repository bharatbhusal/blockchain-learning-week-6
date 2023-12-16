import { useSDK } from '@metamask/sdk-react'
import React, { useEffect } from 'react'
import { ethers, Contract } from "ethers"
import { useAppContext } from '../context/useAppContext';
import stakingAbi from "../ABI/stakingAbi.json"
import withdrawAbi from "../ABI/withdrawAbi.json"
import ethxAbi from "../ABI/ethxAbi.json"

const ConnectWallet = () => {
    const { sdk, connected } = useSDK();
    const { signer, setSigner, ethxContract, setEthxContract, setStakingContract, setWithdrawContract, setEthxBalance, setEthBalance } = useAppContext()

    useEffect(() => {
        const setBalances = async () => {
            try
            {
                const provider = await signer.provider
                const address = await signer.address
                setEthBalance(ethers.formatEther(await provider.getBalance(address)))
                setEthxBalance(ethers.formatEther(await ethxContract.balanceOf(address)))
                console.debug("updating balances")
            } catch (error)
            {
                console.error(error.message)
            }
        }
        setBalances()
    }, [signer])

    useEffect(() => {
        const setContracts = async () => {
            try
            {
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner();
                setSigner(signer)

                const stakingContractAddress = "0xd0e400Ec6Ed9C803A9D9D3a602494393E806F823"
                const withdrawContractAddress = "0x1048Eca024cB2Ba5eA720Ac057D804E95a809Fc8"
                const ethxContractAddress = "0x3338eCd3ab3d3503c55c931d759fA6d78d287236";

                setStakingContract(new Contract(stakingContractAddress, stakingAbi, signer))
                setWithdrawContract(new Contract(withdrawContractAddress, withdrawAbi, signer))
                setEthxContract(new Contract(ethxContractAddress, ethxAbi, signer))
            } catch (error)
            {
                console.error(error)
            }
        }
        if (!ethxContract)
            setContracts()
    }, [signer])



    const handleConnect = async () => {
        try
        {
            await sdk?.connect()
        } catch (err)
        {
            console.warn(`failed to connect..`, err);
        }
    }


    const handleDisConnect = async () => {
        try
        {
            sdk?.terminate();
        } catch (err)
        {
            console.warn(`failed to connect..`, err);
        }
    }

    return (
        <>
            {connected ?
                <button onClick={handleDisConnect}>Disconnect</button> :
                <button onClick={handleConnect}>Connect</button>
            }
        </>
    )
}

export default ConnectWallet