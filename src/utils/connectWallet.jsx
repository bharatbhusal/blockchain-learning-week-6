import React from 'react'
import { Contract, ethers } from "ethers"
import stakingAbi from "../ABI/stakingAbi.json"
import withdrawAbi from "../ABI/withdrawAbi.json"
import ethxAbi from "../ABI/ethxAbi.json"


export const connectWallet = async () => {
    try
    {

        let [signer, provider, stakingContract, withdrawContract, ethxContract, chainId, ethBalance, ethxBalance] = [null]

        if (window.ethereum === null)
        {
            throw new Error("Metamask not installed")
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        })

        let chainIdHex = await window.ethereum.request({
            method: "eth_chainId"
        })

        chainId = parseInt(chainIdHex, 16)

        let userAccount = accounts[0]

        if (!userAccount)
        {
            throw new Error("no ethereum accounts available")
        }

        provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner();

        const balance = await provider.getBalance(userAccount)
        ethBalance = ethers.formatEther(balance)

        const stakingContractAddress = "0xd0e400Ec6Ed9C803A9D9D3a602494393E806F823"
        const withdrawContractAddress = "0x1048Eca024cB2Ba5eA720Ac057D804E95a809Fc8"
        const ethxContractAddress = "0x3338eCd3ab3d3503c55c931d759fA6d78d287236";

        stakingContract = new Contract(stakingContractAddress, stakingAbi, signer)
        withdrawContract = new Contract(withdrawContractAddress, withdrawAbi, signer)
        ethxContract = new Contract(ethxContractAddress, ethxAbi, signer)
        ethxBalance = ethers.formatEther(await ethxContract.balanceOf(userAccount))

        return { provider, userAccount, withdrawContract, stakingContract, ethxContract, chainId, ethBalance, ethxBalance }
    } catch (error)
    {
        console.error(error.message)
    }
}