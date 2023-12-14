import { useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers"
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Approve = () => {

    const { withdrawContract, ethxContract, selectedAccount } = useAppContext();
    const approveStakeAmountRef = useRef();

    const approveToken = async (e) => {

        e.preventDefault();
        const amount = approveStakeAmountRef.current.value.trim();

        if (isNaN(amount) || amount <= 0)
        {
            toast.error("Please enter a valid positive number.");
            return;
        }

        const amountToApprove = ethers.parseUnits(amount, 18).toString();

        try
        {
            const approval = await ethxContract.approve(withdrawContract.target, amountToApprove)

            await toast.promise(approval.wait(),
                {
                    loading: "🔃",
                    success: '✅',
                    error: '❌'
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
            <div >
                <label >Enter ETHx amount</label>
            </div>
            <input type="text" ref={approveStakeAmountRef} placeholder="0.0" />

            <div >"AFTER APPROVAL ONLY YOU CAN UNSTAKE YOUR TOKEN"</div>


            <div >
                <button onClick={approveToken} type="submit" >
                    <span >
                        Approve
                    </span>
                </button>
            </div>

        </form>
    )
}

export default Approve;