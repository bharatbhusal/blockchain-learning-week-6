import React, { useRef } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useRequestIds } from "../utils/useRequestIds";
import { useAppContext } from "../context/useAppContext";

const Claim = () => {
    // Accessing withdrawContract and request-related state from the AppContext
    const { withdrawContract } = useAppContext();
    const { requestIds, finalizedRequestId, updateRequestIds } = useRequestIds();

    // Using useRef to get the claim amount input field
    const claimAmountRef = useRef();

    // Function to handle token claiming
    const claimToken = async (e) => {
        e.preventDefault();

        // Retrieve the request ID from the input field
        const requestID = claimAmountRef.current.value.trim();

        // Validate the input request ID
        if (isNaN(requestID) || requestID <= 0)
        {
            toast.error("Please enter a valid positive number.");
            return;
        }

        try
        {
            // Claim tokens with the specified request ID
            const transaction = await withdrawContract.claim(requestID);

            // Display toast notification based on the claiming result
            await toast.promise(transaction.wait(), {
                loading: "Claim is pending...",
                success: "Claim successful 👌",
                error: "Claim failed 🤯",
            });

            // Clear the input field after successful claiming
            claimAmountRef.current.value = "";

            // Update the list of request IDs after claiming
            await updateRequestIds();
        } catch (error)
        {
            // Handle errors during the claiming process
            console.log("requesttstca ", requestIds);

            if (!requestIds.split(",").includes(requestID))
            {
                toast.error("Enter Correct Request Id 😡");
            } else if (finalizedRequestId <= requestID)
            {
                toast.error("Request Id is not Finalized 🙅🏻");
            } else
            {
                console.error(error.message);
                toast.error("Claim Failed 🤯");
            }
        }
    };

    return (
        <form onSubmit={claimToken}>
            {/* Input for entering request ID */}
            <label>Enter Request ID</label>
            <input type="text" ref={claimAmountRef} placeholder="0" />

            {/* Display list of request IDs if available */}
            {requestIds.length >= 1 ? (
                <div>
                    <span>Request Id :</span>{' '}
                    <span>{requestIds.split(",").reverse().join(",")}</span>
                </div>
            ) : (
                <div className="mt-6"></div>
            )}

            {/* Instruction message */}
            <div>"Claim only after your request ID is finalized."</div>

            {/* Button to trigger token claiming */}
            <button type="submit">Claim</button>
        </form>
    );
};

export default Claim;
