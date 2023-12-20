import React, { useEffect, useRef } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Approve = () => {
    // Accessing withdrawContract and ethxContract from the AppContext
    const { withdrawContract, returnEthBalance, returnEthxBalance, ethxContract, ethxBalance, ethBalance } = useAppContext();

    // Using useRef to get the approve amount input field
    const approveStakeAmountRef = useRef();

    useEffect(() => {
        returnEthBalance()
        returnEthxBalance()
    }, [])

    // Function to handle token approval
    const approveToken = async (e) => {
        e.preventDefault();

        try
        {
            // Retrieve the amount from the input field
            const amount = approveStakeAmountRef.current.value.trim();

            // Validate the input amount
            if (isNaN(amount) || amount <= 0)
                throw new Error("Please enter a valid positive number.");

            if (ethxBalance <= amount)
                throw new Error("Insufficient ETHx balance")

            // Convert the input amount to the appropriate format
            const amountToApprove = ethers.parseUnits(amount, 18).toString();

            approveStakeAmountRef.current.value = "";
            const approvePromise = new Promise(async (resolve, reject) => {
                try
                {
                    const approving = await ethxContract.approve(
                        withdrawContract.target,
                        amountToApprove
                    );
                    const receipt = await approving.wait()
                    resolve(receipt)
                } catch (error)
                {
                    reject(error);
                }
            })


            // // Display toast notification based on the approval result
            await toast.promise(approvePromise, {
                loading: "Approval is pending...",
                success: "Approval successful 👌",
                error: "Approval failed 🤯",
            });

        } catch (error)
        {
            // Handle errors during the approval process
            console.error(error.message);
            toast.error(error.message);
        }
    };

    return (
        <>
            {ethxContract &&
                <form onSubmit={approveToken}>
                    {/* Input for entering approve amount */}
                    <label>Enter ETHx amount</label>
                    <input type="text" ref={approveStakeAmountRef} placeholder="0.0" />

                    {/* Instruction message */}
                    <div>"AFTER APPROVAL ONLY YOU CAN UNSTAKE YOUR TOKEN"</div>

                    {/* Button to trigger token approval */}
                    <button type="submit">Approve</button>
                </form>
            }
        </>
    );
};

export default Approve;
