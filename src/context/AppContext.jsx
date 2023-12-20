import { createContext, useState, useEffect } from "react";
import stakingAbi from "../ABI/stakingAbi.json";
import withdrawAbi from "../ABI/withdrawAbi.json";
import ethxAbi from "../ABI/ethxAbi.json";
import { ethers, Contract } from "ethers";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    // State to manage the Ethereum wallet signer
    const [signer, setSigner] = useState(null);

    // State to manage the Ethereum network chain ID
    const [chainId, setChainId] = useState("chainId");

    // State to manage the user's Ethereum balance
    const [ethBalance, setEthBalance] = useState(null);

    // State to manage the user's ETHx token balance
    const [ethxBalance, setEthxBalance] = useState(null);

    // State to manage the Staking contract instance
    const [stakingContract, setStakingContract] = useState(null);

    // State to manage the Withdraw contract instance
    const [withdrawContract, setWithdrawContract] = useState(null);

    // State to manage the ETHx contract instance
    const [ethxContract, setEthxContract] = useState(null);

    const returnEthBalance = async () => {
        try
        {
            // Fetch and format the Ethereum balance using the signer's provider
            setEthBalance(ethers.formatEther(await signer.provider.getBalance(signer.address)));
        } catch (error)
        {
            console.error(error.message)
        }
    };


    const returnEthxBalance = async () => {
        // Create a contract instance for the ETHx token using the signer
        const contract = new Contract(
            "0x3338eCd3ab3d3503c55c931d759fA6d78d287236",
            ethxAbi,
            signer
        );

        // console.log(signer.address);
        try
        {
            // Fetch and format the ETHx balance using the contract instance
            setEthxBalance(ethers.formatEther(await contract.balanceOf(signer.address)));
        } catch (error)
        {
            console.error(error.message)
        }
    };
    // Object containing the app's state values
    const state = {
        signer,
        setSigner,
        chainId,
        setChainId,
        ethBalance,
        ethxBalance,
        setEthxBalance,
        setEthBalance,
        stakingContract,
        setStakingContract,
        withdrawContract,
        setWithdrawContract,
        ethxContract,
        setEthxContract,
        returnEthBalance,
        returnEthxBalance
    };

    // Effect to listen for changes in the connected Ethereum account and network
    useEffect(() => {
        try
        {// Add listeners for account and chain changes
            window.ethereum.on("accountChanged", () => handleSignerChange(setSigner));
            window.ethereum.on("chainChanged", () => handleChainChange(setChainId));

            // Cleanup: Remove listeners when the component unmounts
            return () => {
                window.ethereum.removeListener("accountChanged", () =>
                    handleSignerChange(setSigner)
                );
                window.ethereum.removeListener("chainChanged", () =>
                    handleChainChange(setChainId)
                );
            };
        } catch (error)
        {
            console.error(error.message)
        }
    }, []);

    // Effect to create contract instances when the signer changes
    useEffect(() => {
        const createContract = (abi, signer, address) => {
            return new Contract(address, abi, signer);
        };

        // Set contract instances based on the staking, withdraw, and ETHx contract addresses
        setStakingContract(
            createContract(stakingAbi, signer, "0xd0e400Ec6Ed9C803A9D9D3a602494393E806F823")
        );
        setWithdrawContract(
            createContract(withdrawAbi, signer, "0x1048Eca024cB2Ba5eA720Ac057D804E95a809Fc8")
        );
        setEthxContract(
            createContract(ethxAbi, signer, "0x3338eCd3ab3d3503c55c931d759fA6d78d287236")
        );
    }, [signer]);

    // Effect to update the user's Ethereum balance when the signer changes


    useEffect(() => {
        // Call the function to update the Ethereum balance
        returnEthBalance();
    }, [signer]);

    // Effect to update the user's ETHx token balance when the ETHx contract changes

    useEffect(() => {

        // Check if the ETH balance is not null before updating ETHx balance
        if (!ethBalance) returnEthxBalance();
    }, [ethxContract]);

    // Function to handle changes in the connected Ethereum account
    const handleSignerChange = async (setSigner) => {
        // Request the updated signer when the account changes
        const newSigner = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        // Set the new signer in the state
        setSigner(newSigner);
    };

    // Function to handle changes in the Ethereum network chain ID
    const handleChainChange = async (setChain) => {
        // Request the updated chain ID when the network changes
        let newChain = await window.ethereum.request({
            method: "eth_chainId",
        });

        // Set the new chain ID in the state
        setChain(newChain);
    };

    // Provide the app's state to the children components
    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    );
};

// Include your comments
