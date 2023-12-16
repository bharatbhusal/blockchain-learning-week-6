// Importing necessary modules from React and related libraries
import { createRoot } from "react-dom/client"
import { createHashRouter as createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import { MetaMaskProvider } from '@metamask/sdk-react';
import { AppContextProvider } from "./context/AppContext.jsx"
import ErrorPage from "./error/error-page.jsx"
import Stake from "./components/Stake.jsx"
import Approve from "./components/Approve.jsx"
import Withdraw from "./components/Withdraw.jsx"
import Claim from "./components/Claim.jsx"

// Getting the container element by its ID from the DOM
const container = document.getElementById("root")

// Creating a BrowserRouter to handle routing in the app
const router = createBrowserRouter([
    {
        // Setting up the root path for the app
        path: "/blockchain-learning-week-6/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                // Defining a path for the "stake" route
                path: "/blockchain-learning-week-6/stake",
                element: <Stake />
            },
            {
                // Defining a path for the "approve" route
                path: "/blockchain-learning-week-6/approve",
                element: <Approve />
            },
            {
                // Defining a path for the "withdraw" route
                path: "/blockchain-learning-week-6/withdraw",
                element: <Withdraw />
            },
            {
                // Defining a path for the "claim" route
                path: "claim",
                element: <Claim />
            },
        ]
    }
])

// Creating a root element to render the entire React app
const root = createRoot(container)

// Rendering the app within the AppContextProvider and RouterProvider
root.render(
    <AppContextProvider>
        <MetaMaskProvider debug={false} sdkOptions={{
            checkInstallationImmediately: false,
            dappMetadata: {
                name: "Stake-Unstake",
                url: window.location.host,
            }
        }}>
            <RouterProvider router={router} />
        </MetaMaskProvider>
    </AppContextProvider>
)
