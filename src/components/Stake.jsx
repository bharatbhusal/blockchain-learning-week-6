import React, { useRef, useState } from "react";
import { ethers } from "ethers";

import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";



const Stake = () => {
    const { stakingContract, signer } = useAppContext();
    const stakeAmountRef = useRef();
    const [ethAmount, setEthAmount] = useState(0);

    const handleAmountChange = (e) => {
        const amount = e.target.value.trim();

        const amountToConvert = (amount * (1 / 1.015151)).toFixed(6);

        setEthAmount(amountToConvert);
    };

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
            const transaction = await stakingContract.deposit(signer.address, signer.address, { value: amountToStake });
            await toast.promise(transaction.wait(),
                {
                    loading: "Staking is pending...",
                    success: 'Staking successful 👌',
                    error: 'Staking failed 🤯'
                });

            stakeAmountRef.current.value = "";

        } catch (error)
        {
            if (stakingContract == null)
            {
                toast.error("Connect To Wallet First")
            } else
            {
                console.log(error.message)
                toast.error("Staking Failed");
            }
        }
    };


    return (
        <form >
            <label >Enter ETH amount</label>
            <input
                type="text"
                ref={stakeAmountRef}
                placeholder="0.0"
                onChange={handleAmountChange}
            />
            <div>You will receive: {ethAmount || 0} ETHx</div>
            <div className="rate">1 ETHx = 1.015151 ETH</div>
            <button onClick={stakeToken} type="submit" >
                Stake
            </button>
        </form>
    );
};

export default Stake;
