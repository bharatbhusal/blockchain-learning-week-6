import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { AppContextProvider } from "./context/AppContext.jsx"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <AppContextProvider>
        <App />
    </AppContextProvider>
)