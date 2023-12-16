import { useContext, useRef } from "react";
import { ethers, parseEther } from "ethers";

import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Withdraw = () => {
    const { withdrawContract, signer, ethxBalance } = useAppContext()
    const unstakeAmountRef = useRef();

    const unstakeToken = async (e) => {
        e.preventDefault();

        try
        {
            const amount = unstakeAmountRef.current.value.trim();

            if (isNaN(amount) || amount <= 0)
                throw new Error("Please enter a valid positive number.");

            const amountToUnstake = ethers.parseUnits(amount, 18).toString();

            if (parseEther(ethxBalance) <= amountToUnstake)
                throw new Error("Insufficient ETHx Balance")

            unstakeAmountRef.current.value = "";

            const transaction = await withdrawContract.requestWithdraw(
                amountToUnstake,
                signer.address
            );


            await toast.promise(transaction.wait(),
                {
                    loading: "Withdrawal is pending...",
                    success: 'Withdrawal successful 👌',
                    error: 'Withdrawal failed 🤯'
                });

        } catch (error)
        {
            console.error(error)
            if (error.message.includes("insufficient allowance"))
                return toast.error("Insufficient Allowance")
            if (error.message.includes("user rejected"))
                return toast.error("User Rejected Action")
            toast.error(error.message)
        }
    };

    return (

        <>
            {
                withdrawContract ?
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
                    :
                    <>WithdrawContract not found</>
            }
        </>
    );
};

export default Withdraw;