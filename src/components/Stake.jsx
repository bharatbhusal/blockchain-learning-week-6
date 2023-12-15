import React, { useRef } from "react";
import { ethers } from "ethers";

import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Stake = () => {
    const { stakingContract, userAccount } = useAppContext();
    const stakeAmountRef = useRef();


    const stakeToken = async (e) => {
        e.preventDefault();
        try
        {
            const amount = stakeAmountRef.current.value.trim();

            if (isNaN(amount) || amount <= 0)
            {
                toast.error("Please enter a valid positive number.");
                return;
            }

            const amountToStake = ethers.parseUnits(amount, 18).toString();


            const transaction = await stakingContract.deposit(userAccount, { value: amountToStake });
            await toast.promise(transaction.wait(), {
                loading: "🔃",
                success: '✅',
                error: '❌'
            });

            stakeAmountRef.current.value = "";
        } catch (error)
        {
            if (stakingContract == null)
            {
                toast.error("Connect To Wallet First");
            } else
            {
                toast.error("❌❌❌");
            }
        }
    };

    return (
        <form onSubmit={stakeToken} >
            <label >Enter ETH amount</label>
            <input
                type="text"
                ref={stakeAmountRef}
                placeholder="0.0"
            />
            <button onClick={stakeToken} type="submit" >
                Stake
            </button>
        </form>
    );
};

export default Stake;
