import { useContext, useEffect, useRef, useState } from "react";
import { ethers, parseEther } from "ethers"
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Approve = () => {
    const { withdrawContract, ethxContract, ethxBalance } = useAppContext();
    const approveStakeAmountRef = useRef();

    const approveToken = async (e) => {
        e.preventDefault();
        try
        {
            const amount = approveStakeAmountRef.current.value.trim();

            if (isNaN(amount) || amount <= 0)
                throw new Error("Please enter a valid positive number.");

            const amountToApprove = ethers.parseUnits(amount, 18).toString();

            approveStakeAmountRef.current.value = "";

            if (parseEther(ethxBalance) <= amountToApprove)
                throw new Error("Insufficent ETHx Balance")

            const approval = await ethxContract.approve(withdrawContract.target, amountToApprove)

            await toast.promise(approval.wait(),
                {
                    loading: "Approval is pending...",
                    success: 'Approval successful 👌',
                    error: 'Approval failed 🤯'
                });


        } catch (error)
        {
            console.error(error.message)
            toast.error(error.message)
        }
    };

    return (

        <>
            {
                ethxContract && withdrawContract ?
                    <form onSubmit={approveToken} >
                        <label >Enter ETHx amount</label>
                        <input type="text" ref={approveStakeAmountRef} placeholder="0.0" />
                        <div >"AFTER APPROVAL ONLY YOU CAN UNSTAKE YOUR TOKEN"</div>
                        <button onClick={approveToken} type="submit" >
                            Approve
                        </button>

                    </form>
                    :
                    <>EthxContract or WithdrawContract not avaiable</>
            }
        </>
    )
}

export default Approve;