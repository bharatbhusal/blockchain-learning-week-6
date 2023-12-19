import React, { useRef } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Approve = () => {
    // Accessing withdrawContract and ethxContract from the AppContext
    const { withdrawContract, ethxContract } = useAppContext();

    // Using useRef to get the approve amount input field
    const approveStakeAmountRef = useRef();

    // Function to handle token approval
    const approveToken = async (e) => {
        e.preventDefault();

        try
        {
            // Retrieve the amount from the input field
            const amount = approveStakeAmountRef.current.value.trim();

            // Validate the input amount
            if (isNaN(amount) || amount <= 0)
            {
                toast.error("Please enter a valid positive number.");
                return;
            }

            // Convert the input amount to the appropriate format
            const amountToApprove = ethers.parseUnits(amount, 18).toString();

            // Approve the specified amount with the ethxContract
            const approval = await ethxContract.approve(
                withdrawContract.target,
                amountToApprove
            );

            // Display toast notification based on the approval result
            await toast.promise(approval.wait(), {
                loading: "Approval is pending...",
                success: "Approval successful 👌",
                error: "Approval failed 🤯",
            });

            // Clear the input field after successful approval
            approveStakeAmountRef.current.value = "";
        } catch (error)
        {
            // Handle errors during the approval process
            if (ethxContract == null)
            {
                toast.error("Connect To Wallet First");
            } else
            {
                console.error(error.message);
                toast.error("Approval Failed");
            }
        }
    };

    return (
        <form onSubmit={approveToken}>
            {/* Input for entering approve amount */}
            <label>Enter ETHx amount</label>
            <input type="text" ref={approveStakeAmountRef} placeholder="0.0" />

            {/* Instruction message */}
            <div>"AFTER APPROVAL ONLY YOU CAN UNSTAKE YOUR TOKEN"</div>

            {/* Button to trigger token approval */}
            <button type="submit">Approve</button>
        </form>
    );
};

export default Approve;
