import React, { useContext, useRef, useState } from "react";
import { ethers } from "ethers";
import { useStakeContext } from "./context/useStakeContext"
import { toast } from "react-hot-toast";

const StakeAmount = () => {
    const { stakingContract, selectedAccount, ethxContract } = useStakeContext();
    console.log(stakingContract, selectedAccount, ethxContract)
    const stakeAmountRef = useRef();
    const [ethAmount, setEthAmount] = useState(0);


    // const stakeToken = async (e) => {
    //     e.preventDefault();
    //     const amount = stakeAmountRef.current.value.trim();

    //     if (isNaN(amount) || amount <= 0)
    //     {
    //         toast.error("Please enter a valid positive number.");
    //         return;
    //     }

    //     const amountToStake = ethers.parseUnits(amount, 18).toString();

    //     try
    //     {
    //         const transaction = await stakingContract.deposit(selectedAccount, selectedAccount, { value: amountToStake });
    //         await toast.promise(transaction.wait(), {
    //             loading: "🔃",
    //             success: '✅',
    //             error: '❌'
    //         });

    //         stakeAmountRef.current.value = "";
    //         console.log("hi")
    //         // await updateBalance();
    //     } catch (error)
    //     {
    //         if (stakingContract == null)
    //         {
    //             toast.error("Connect To Wallet First");
    //         } else
    //         {
    //             toast.error("❌❌❌");
    //         }
    //     }
    // };

    // return (
    //     <form onSubmit={stakeToken} >
    //         <div >
    //             <label >Enter ETH amount</label>
    //         </div>
    //         <input
    //             type="text"
    //             ref={stakeAmountRef}
    //             placeholder="0.0"
    //         />
    //         <div ></div>
    //         <div ></div>
    //         <div >
    //             <button onClick={stakeToken} type="submit" >
    //                 <span >
    //                     Stake
    //                 </span>
    //             </button>
    //         </div>
    //     </form>
    // );
};

export default StakeAmount;
