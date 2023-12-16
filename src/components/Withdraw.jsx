import { useContext, useRef } from "react";
import { ethers } from "ethers";

import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Withdraw = () => {
    const { withdrawContract, signer } = useAppContext()
    const unstakeAmountRef = useRef();

    const unstakeToken = async (e) => {
        e.preventDefault();

        try
        {
            const amount = unstakeAmountRef.current.value.trim();

            if (isNaN(amount) || amount <= 0)
            {
                toast.error("Please enter a valid positive number.");
                return;
            }

            const amountToUnstake = ethers.parseUnits(amount, 18).toString();

            const transactionPromise = new Promise(async (resolve, reject) => {
                try
                {
                    const transaction = await withdrawContract.requestWithdraw(
                        amountToUnstake,
                        signer.address
                    );
                    const receipt = await transaction.wait();
                    resolve(receipt);
                } catch (error)
                {
                    reject(error);
                }
            });

            await toast.promise(transactionPromise.wait(),
                {
                    loading: "Approval is pending...",
                    success: 'Approval successful 👌',
                    error: 'Approval failed 🤯'
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
            <label >
                Enter ETHx amount
            </label>
            <input
                type="text"
                ref={unstakeAmountRef}
                placeholder="0.0"
            />
            <div>
                "After successfully unstaking tokens, a request ID will be generated."
            </div>
            <button onClick={unstakeToken} type="submit" >
                Unstake
            </button>
        </form>
    );
};

export default Withdraw;
