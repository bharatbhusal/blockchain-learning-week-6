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
        try
        {
            // Retrieve the request ID from the input field
            const requestID = claimAmountRef.current.value.trim();

            // Validate the input request ID
            if (isNaN(requestID) || requestID <= 0)
                throw new Error("Please enter a valid positive number.");



            if (!requestIds.split(",").includes(requestID))
                throw new Error("Incorrect Request Id")
            else if (finalizedRequestId <= requestID)
                throw new Error("Request Id is not Finalized yet.")


            claimAmountRef.current.value = "";
            const claimPromise = new Promise(async (resolve, reject) => {
                try
                {
                    const claiming = await withdrawContract.claim(requestID);
                    const receipt = await claiming.wait()
                    resolve(receipt)
                } catch (error)
                {
                    reject(error);
                }
            })

            // // Display toast notification based on the approval result
            await toast.promise(claimPromise, {
                loading: "Claim is pending...",
                success: "Claim successful 👌",
                error: "Claim failed 🤯",
            });
            await updateRequestIds();

        } catch (error)
        {
            console.error(error.message)
            toast.error(error.message)
        }
    };

    return (
        <>
            {withdrawContract &&
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
            }
        </>
    );
};

export default Claim;
