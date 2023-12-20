import React, { useRef, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";

const Stake = () => {
    // Accessing stakingContract and signer from the AppContext
    const { stakingContract, signer, ethBalance, chainId } = useAppContext();

    // Using useRef to get the stake amount input field
    const stakeAmountRef = useRef();

    // Using state to track the converted ETH amount
    const [ethAmount, setEthAmount] = useState(0);

    // Handler to update ETH amount based on user input
    const handleAmountChange = (e) => {
        const amount = e.target.value.trim();
        const amountToConvert = (amount * (1 / 1.015151)).toFixed(6);
        setEthAmount(amountToConvert);
    };

    // Function to handle staking
    const stakeToken = async (e) => {
        e.preventDefault();

        try
        {

            if (chainId !== "0x5")
                throw new Error("Please switch to Goerli Network")

            // Retrieve the amount from the input field
            const amount = stakeAmountRef.current.value.trim();

            // Validate the input amount
            if (isNaN(amount) || amount <= 0)
                throw new Error("Please enter a valid positive number.");

            // Convert the input amount to the appropriate format
            const amountToStake = ethers.parseUnits(amount, 18).toString();


            if ((parseFloat(amountToStake)) >= parseFloat(ethers.parseUnits(ethBalance, 18).toString()))
                throw new Error("Insufficient ETH balance")

            stakeAmountRef.current.value = "";

            const stakingPromise = new Promise(async (resolve, reject) => {
                try
                {
                    const staking = await stakingContract.deposit(
                        signer.address,
                        signer.address,
                        { value: amountToStake }
                    );
                    const receipt = await staking.wait()
                    resolve(receipt)
                } catch (error)
                {
                    reject(error);
                }
            })

            await toast.promise(stakingPromise, {
                loading: "Staking is pending...",
                success: "Staking successful 👌",
                error: "Staking failed 🤯",
            })

        } catch (error)
        {
            // Handle errors during the staking process
            toast.error(error.message);
            console.error(error.message);

        }
    };

    return (
        <>
            {stakingContract && signer ? < form >
                {/* Input for entering stake amount */}
                < label > Enter ETH amount</label >
                <input
                    type="text"
                    ref={stakeAmountRef}
                    placeholder="0.0"
                    onChange={handleAmountChange}
                />

                {/* Display the converted ETH amount */}
                <div>You will receive: {ethAmount || 0} ETHx</div>

                {/* Display the conversion rate */}
                <div className="rate">1 ETHx = 1.015151 ETH</div>

                {/* Button to trigger staking */}
                <button onClick={stakeToken} type="submit">
                    Stake
                </button>
            </form >
                : <div className="no_staking">"Connect to the wallet first"</div>
            }
        </>

    );
};

export default Stake;
