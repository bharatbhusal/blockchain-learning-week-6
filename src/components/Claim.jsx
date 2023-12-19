import { useContext, useRef } from "react";
import { ethers } from "ethers";

import { toast } from "react-hot-toast";
import { useRequestIds } from "../utils/useRequestIds";
import { useAppContext } from "../context/useAppContext";

const Claim = () => {
    const { withdrawContract } = useAppContext()
    const claimAmountRef = useRef();
    const { requestIds, finalizedRequestId, updateRequestIds } = useRequestIds();

    const cliamToken = async (e) => {
        e.preventDefault();

        const requestID = claimAmountRef.current.value.trim();

        if (isNaN(requestID) || requestID <= 0)
        {
            toast.error("Please enter a valid positive number.");
            return;
        }

        try
        {
            const transaction = await withdrawContract.claim(requestID);
            await toast.promise(transaction.wait(),
                {
                    loading: "Claim is pending...",
                    success: 'Claim successful 👌',
                    error: 'Claim failed 🤯'
                });

            claimAmountRef.current.value = "";
            await updateRequestIds();
        } catch (error)
        {
            console.log("requesttstca ", requestIds);
            if (!requestIds.split(",").includes(requestID))
            {
                toast.error("Enter Correct Request Id 😡");
            } else if (finalizedRequestId <= requestID)
            {
                toast.error("Request Id is not Finalized 🙅🏻");
            } else
            {
                toast.error("Claim Failed 🤯");
                console.error(error.message);
            }
        }
    };

    return (
        <form onSubmit={cliamToken} >
            <label >Enter Request ID</label>
            <input
                type="text"
                ref={claimAmountRef}
                placeholder="0"
            />
            {requestIds.length >= 1 ? (
                <div>
                    <span >Request Id :</span>{' '}
                    <span >{requestIds.split(",").reverse().join(",")}</span>
                </div>
            ) : (
                <div className="mt-6"></div>
            )}
            <div >
                "Claim only after your request ID is finalized."
            </div>


            <button onClick={cliamToken} type="submit" >

                Claim

            </button>
        </form>
    );
};

export default Claim;
