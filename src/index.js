import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppContextProvider } from "./context/AppContext.jsx"
import ErrorPage from "./error/error-page.jsx"
import Stake from "./components/Stake.jsx"
import Approve from "./components/Approve.jsx"
import Withdraw from "./components/Withdraw.jsx"
import Claim from "./components/Claim.jsx"

const container = document.getElementById("root")

const router = createBrowserRouter([
    {
        path: "/blockchain-learning-week-6/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/blockchain-learning-week-6/stake",
                element: <Stake />
            },
            {
                path: "/blockchain-learning-week-6/approve",
                element: <Approve />
            },
            {
                path: "/blockchain-learning-week-6/withdraw",
                element: <Withdraw />
            },
            {
                path: "/blockchain-learning-week-6/claim",
                element: <Claim />
            },
        ]
    }
])

const root = createRoot(container)
root.render(
    <AppContextProvider>
        <RouterProvider router={router} />
    </AppContextProvider>
)