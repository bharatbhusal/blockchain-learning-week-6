import { useContext, useRef } from "react";
import { ethers } from "ethers";

import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Withdraw = () => {
    const { withdrawContract, selectedAccount } = useAppContext()
    const unstakeAmountRef = useRef();

    const unstakeToken = async (e) => {
        e.preventDefault();

        const amount = unstakeAmountRef.current.value.trim();

        if (isNaN(amount) || amount <= 0)
        {
            toast.error("Please enter a valid positive number.");
            return;
        }

        const amountToUnstake = ethers.parseUnits(amount, 18).toString();

        try
        {
            const transactionPromise = new Promise(async (resolve, reject) => {
                try
                {
                    const transaction = await withdrawContract.requestWithdraw(
                        amountToUnstake,
                        selectedAccount
                    );
                    const receipt = await transaction.wait();
                    resolve(receipt);
                } catch (error)
                {
                    reject(error);
                }
            });

            await toast.promise(transactionPromise, {
                loading: "🔃",
                success: '✅',
                error: '❌'
            });

            unstakeAmountRef.current.value = "";
        } catch (error)
        {
            if (withdrawContract == null)
            {
                toast.error("Connect To Wallet First");
            } else
            {
                toast.error("Transaction Failed 🤯");
                console.error(error.code);
            }
        }
    };

    return (
        <form
            onSubmit={unstakeToken}>
            <div >
                <label >
                    Enter ETHx amount
                </label>
            </div>
            <input
                type="text"
                ref={unstakeAmountRef}
                placeholder="0.0"
            />

            <div>
                "After successfully unstaking tokens, a request ID will be generated."
            </div>

            <div >
                <button onClick={unstakeToken} type="submit" >
                    <span >
                        Unstake
                    </span>
                </button>
            </div>
        </form>
    );
};

export default Withdraw;
