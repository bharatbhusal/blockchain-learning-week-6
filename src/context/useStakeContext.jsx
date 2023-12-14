import { useContext } from "react"
import { StakeContext } from "./StakeContext"

export const useStakeContext = () => {
    const context = useContext(StakeContext)
    // console.log(context)
    if (context === undefined)
    {
        throw new Error("useStakeContext must be used within a StakeContextProvider")
    }
    return context
}