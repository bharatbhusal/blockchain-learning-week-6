import { useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers"
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Approve = () => {

    const { withdrawContract, ethxContract, userAccount } = useAppContext();
    const approveStakeAmountRef = useRef();

    const approveToken = async (e) => {

        e.preventDefault();
        try
        {
            const amount = approveStakeAmountRef.current.value.trim();

            if (isNaN(amount) || amount <= 0)
            {
                toast.error("Please enter a valid positive number.");
                return;
            }

            const amountToApprove = ethers.parseUnits(amount, 18).toString();


            const approval = await ethxContract.approve(withdrawContract.target, amountToApprove)

            await toast.promise(approval.wait(),
                {
                    loading: "Approval is pending...",
                    success: 'Approval successful 👌',
                    error: 'Approval failed 🤯'
                });

            approveStakeAmountRef.current.value = "";

        } catch (error)
        {
            if (ethxContract == null)
            {
                toast.error("Connect To Wallet First")
            } else
            {
                toast.error("Staking Failed");
                console.error(error.message)
            }
        }
    };

    return (
        <form onSubmit={approveToken} >
            <label >Enter ETHx amount</label>
            <input type="text" ref={approveStakeAmountRef} placeholder="0.0" />
            <div >"AFTER APPROVAL ONLY YOU CAN UNSTAKE YOUR TOKEN"</div>
            <button onClick={approveToken} type="submit" >
                Approve
            </button>

        </form>
    )
}

export default Approve;