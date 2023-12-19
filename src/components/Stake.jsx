import React, { useRef, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";


const Stake = () => {
    const { stakingContract, signer, ethxBalance, ethBalance, setEthxBalance, ethxContract } = useAppContext();
    const stakeAmountRef = useRef();
    const [ethAmount, setEthAmount] = useState(0);

    // const { ethxBalance, setEthxBalance } = useState()

    const handleAmountChange = async (e) => {
        const amount = e.target.value.trim();
        const amountToConvert = (amount * (1 / 1.015151)).toFixed(6);
        setEthAmount(amountToConvert);
        setEthxBalance(await ethxContract.balanceOf(signer.address))
    };


    const stakeToken = async (e) => {
        e.preventDefault();
        try
        {
            const amount = stakeAmountRef.current.value.trim();

            if (isNaN(amount) || amount <= 0)
                throw new Error("Please enter a valid positive number.");

            const amountToStake = ethers.parseUnits(amount, 18).toString();

            if (ethers.parseEther(ethBalance) <= amountToStake)
                throw new Error("Insufficient ETH Balance")

            stakeAmountRef.current.value = "";
            const stakePromise = new Promise(async (resolve, reject) => {
                try
                {
                    const stake = await stakingContract.deposit(signer.address, signer.address, { value: amountToStake });
                    const receipt = await stake.wait()
                    resolve(receipt)
                } catch (error)
                {
                    reject(error)
                }
            })

            await toast.promise(stakePromise,
                {
                    loading: "Staking is pending...",
                    success: 'Staking successful 👌',
                    error: 'Staking failed 🤯'
                });

        } catch (error)
        {
            console.error(error)
            if (error.message.includes("user rejected"))
                return toast.error("User Rejected Action")

            toast.error(error.message)
        }
    };

    return (
        <>
            {stakingContract ?
                <form >
                    <label >Enter ETH amount</label>
                    <input
                        type="text"
                        ref={stakeAmountRef}
                        placeholder="0.0"
                        onChange={handleAmountChange}
                    />
                    {ethxBalance}
                    <div>You will receive: {ethAmount || 0} ETHx</div>
                    <div className="rate">1 ETHx = 1.015151 ETH</div>
                    <button onClick={stakeToken} type="submit" >
                        Stake
                    </button>
                </form>
                :
                <>Staking Contract Not available</>
            }
        </>
    );
};

export default Stake;
