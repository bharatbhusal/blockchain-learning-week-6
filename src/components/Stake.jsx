import React, { useRef } from "react";
import { ethers } from "ethers";

import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Stake = () => {
    const { stakingContract, selectedAccount } = useAppContext();
    const stakeAmountRef = useRef();


    const stakeToken = async (e) => {
        e.preventDefault();
        const amount = stakeAmountRef.current.value.trim();

        if (isNaN(amount) || amount <= 0)
        {
            toast.error("Please enter a valid positive number.");
            return;
        }

        const amountToStake = ethers.parseUnits(amount, 18).toString();

        try
        {
            const transaction = await stakingContract.deposit(selectedAccount, { value: amountToStake });
            // const transaction = await stakingContract.deposit(selectedAccount, selectedAccount, { value: amountToStake });
            await toast.promise(transaction.wait(), {
                loading: "🔃",
                success: '✅',
                error: '❌'
            });

            stakeAmountRef.current.value = "";
            // await updateBalance();
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
            <div >
                <label >Enter ETH amount</label>
            </div>
            <input
                type="text"
                ref={stakeAmountRef}
                placeholder="0.0"
            />
            <div ></div>
            <div ></div>
            <div >
                <button onClick={stakeToken} type="submit" >
                    <span >
                        Stake
                    </span>
                </button>
            </div>
        </form>
    );
};

export default Stake;
