import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { MetaMaskProvider } from '@metamask/sdk-react';

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <MetaMaskProvider debug={false} sdkOptions={{
        checkInstallationImmediately: false,
        dappMetadata: {
            name: "Stake-Unstake",
            url: window.location.host,
        }
    }}>
        <App />
    </MetaMaskProvider>
)