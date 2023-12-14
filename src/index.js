import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { StakeContextProvider } from "./context/StakeContext.jsx"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <StakeContextProvider>
        <App />
    </StakeContextProvider>
)