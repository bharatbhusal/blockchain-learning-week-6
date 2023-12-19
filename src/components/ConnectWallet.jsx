
import React, { useEffect } from 'react'
import { ethers, Contract } from "ethers"
import { useAppContext } from '../context/useAppContext';
import stakingAbi from "../ABI/stakingAbi.json"
import withdrawAbi from "../ABI/withdrawAbi.json"
import ethxAbi from "../ABI/ethxAbi.json"
import { useEthxBalance } from "../utils/useEthxBalance"

const ConnectWallet = () => {
    const { signer, setSigner, setChainId, setEthxBalance, setEthxContract, setStakingContract, ethxContract, setWithdrawContract, setEthBalance } = useAppContext()
    const { ethxBalance, updateBalance } = useEthxBalance()

    const getProvider = () => {
        return new ethers.BrowserProvider(window.ethereum)
    }
    const connectWallet = async () => {
        try
        {

            if (window.ethereum === null)
            {
                throw new Error("Metamask not installed")
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })

            setChainId(await window.ethereum.request({
                method: "eth_chainId"
            }))


            // chainId = parseInt(chainIdHex, 16)

            let selectedAccount = accounts[0]

            if (!selectedAccount)
                throw new Error("no ethereum accounts available")



            const provider = getProvider()
            setSigner(await provider.getSigner())

            setEthBalance(ethers.formatEther(await provider.getBalance(selectedAccount)))

            const stakingContractAddress = "0xd0e400Ec6Ed9C803A9D9D3a602494393E806F823"
            const withdrawContractAddress = "0x1048Eca024cB2Ba5eA720Ac057D804E95a809Fc8"
            const ethxContractAddress = "0x3338eCd3ab3d3503c55c931d759fA6d78d287236";

            setStakingContract(new Contract(stakingContractAddress, stakingAbi, signer))
            setWithdrawContract(new Contract(withdrawContractAddress, withdrawAbi, signer))
            setEthxContract(new Contract(ethxContractAddress, ethxAbi, signer))

            setEthxBalance(await ethxContract.balanceOf(signer.address))

            // setEthxBalance(ethxBalance)
            // await updateBalance()
        } catch (error)
        {
            console.error(error.message)
        }
    }

    return (
        <div className='connection'>
            <button style={{ color: "black" }} onClick={connectWallet}>Connect</button>
        </div>
    )
}

export default ConnectWallet