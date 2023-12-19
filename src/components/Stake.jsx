import React, { useRef, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Stake = () => {
    // Accessing stakingContract and signer from the AppContext
    const { stakingContract, signer } = useAppContext();

    // Using useRef to get the stake amount input field
    const stakeAmountRef = useRef();

    // Using state to track the converted ETH amount
    const [ethAmount, setEthAmount] = useState(0);

    // Handler to update ETH amount based on user input
    const handleAmountChange = (e) => {
        const amount = e.target.value.trim();
        const amountToConvert = (amount * (1 / 1.015151)).toFixed(6);
        setEthAmount(amountToConvert);
    };

    // Function to handle staking
    const stakeToken = async (e) => {
        e.preventDefault();

        // Retrieve the amount from the input field
        const amount = stakeAmountRef.current.value.trim();

        // Validate the input amount
        if (isNaN(amount) || amount <= 0)
        {
            toast.error("Please enter a valid positive number.");
            return;
        }

        // Convert the input amount to the appropriate format
        const amountToStake = ethers.parseUnits(amount, 18).toString();

        try
        {
            // Deposit the staked amount to the staking contract
            const transaction = await stakingContract.deposit(
                signer.address,
                signer.address,
                { value: amountToStake }
            );

            // Display toast notification based on the transaction result
            await toast.promise(transaction.wait(), {
                loading: "Staking is pending...",
                success: "Staking successful 👌",
                error: "Staking failed 🤯",
            });

            // Clear the input field after successful staking
            stakeAmountRef.current.value = "";
        } catch (error)
        {
            // Handle errors during the staking process
            if (stakingContract == null)
            {
                toast.error("Connect To Wallet First");
            } else
            {
                console.error(error.message);
                toast.error("Staking Failed");
            }
        }
    };

    return (
        <form>
            {/* Input for entering stake amount */}
            <label>Enter ETH amount</label>
            <input
                type="text"
                ref={stakeAmountRef}
                placeholder="0.0"
                onChange={handleAmountChange}
            />

            {/* Display the converted ETH amount */}
            <div>You will receive: {ethAmount || 0} ETHx</div>

            {/* Display the conversion rate */}
            <div className="rate">1 ETHx = 1.015151 ETH</div>

            {/* Button to trigger staking */}
            <button onClick={stakeToken} type="submit">
                Stake
            </button>
        </form>
    );
};

export default Stake;
