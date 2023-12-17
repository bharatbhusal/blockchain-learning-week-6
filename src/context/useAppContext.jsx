import { useContext } from "react"
import { AppContext } from "./AppContext"

const useAppContext = () => {
    const context = useContext(AppContext)
    if (context === undefined)
    {
        throw new Error("useAppContext must be used withint a AppContextProvider")
    }
    return context
}

export default useAppContext