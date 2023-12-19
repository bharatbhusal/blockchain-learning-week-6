import React, { useRef } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Withdraw = () => {
    // Accessing withdrawContract and signer from the AppContext
    const { withdrawContract, signer } = useAppContext();

    // Using useRef to get the unstake amount input field
    const unstakeAmountRef = useRef();

    // Function to handle token withdrawal
    const unstakeToken = async (e) => {
        e.preventDefault();

        try
        {
            // Retrieve the amount from the input field
            const amount = unstakeAmountRef.current.value.trim();

            // Validate the input amount
            if (isNaN(amount) || amount <= 0)
            {
                toast.error("Please enter a valid positive number.");
                return;
            }

            // Convert the input amount to the appropriate format
            const amountToUnstake = ethers.parseUnits(amount, 18).toString();

            // Create a promise for the withdrawal transaction
            const transactionPromise = new Promise(async (resolve, reject) => {
                try
                {
                    // Request withdrawal from the withdrawContract
                    const transaction = await withdrawContract.requestWithdraw(
                        amountToUnstake,
                        signer.address
                    );

                    // Wait for the transaction receipt
                    const receipt = await transaction.wait();
                    resolve(receipt);
                } catch (error)
                {
                    reject(error);
                }
            });

            // Display toast notification based on the withdrawal result
            await toast.promise(transactionPromise, {
                loading: "Withdraw request is pending...",
                success: "Withdraw request successful 👌",
                error: "Withdraw request failed 🤯",
            });

            // Clear the input field after successful withdrawal
            unstakeAmountRef.current.value = "";
        } catch (error)
        {
            // Handle errors during the withdrawal process
            if (withdrawContract == null)
            {
                toast.error("Connect To Wallet First");
            } else
            {
                console.error(error.message);
                toast.error("Transaction Failed 🤯");
            }
        }
    };

    return (
        <form onSubmit={unstakeToken}>
            {/* Input for entering unstake amount */}
            <label>Enter ETHx amount</label>
            <input type="text" ref={unstakeAmountRef} placeholder="0.0" />

            {/* Instruction message */}
            <div>"After successfully unstaking tokens, a request ID will be generated."</div>

            {/* Button to trigger token withdrawal */}
            <button type="submit">Unstake</button>
        </form>
    );
};

export default Withdraw;
