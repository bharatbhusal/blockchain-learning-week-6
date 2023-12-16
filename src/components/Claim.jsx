import { useRef } from "react";

import { toast } from "react-hot-toast";
import { useRequestIds } from "../utils/useRequestIds";
import { useAppContext } from "../context/useAppContext";

const Claim = () => {
    const { withdrawContract } = useAppContext()
    const claimAmountRef = useRef();
    const { requestIds, finalizedRequestId, updateRequestIds } = useRequestIds();

    const cliamToken = async (e) => {
        e.preventDefault();

        try
        {
            const requestID = claimAmountRef.current.value.trim();

            if (isNaN(requestID) || requestID <= 0)
                throw new Error("Please enter a valid positive number.");

            if (!requestIds.split(",").includes(requestID))
                throw new Error("Enter Correct Request Id");


            if (finalizedRequestId <= requestID)
                throw new Error("Request Id is not Finalized")

            const transaction = await withdrawContract.claim(requestID);
            await toast.promise(transaction.wait(),
                {
                    loading: "Approval is pending...",
                    success: 'Approval successful 👌',
                    error: 'Approval failed 🤯'
                });

            claimAmountRef.current.value = "";
            await updateRequestIds();
        } catch (error)
        {
            console.error(error)
            toast.error(error.message)
        }
    };

    return (
        <>
            {
                withdrawContract ?
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
                    :
                    <>withdrawContract not found</>
            }
        </>
    );
};

export default Claim;
