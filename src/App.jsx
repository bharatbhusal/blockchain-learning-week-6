import React from 'react';
import "./App.css";
import env from "./utils/validateEnv"
import { NavLink, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Balance from './components/Balance';
import Account from './components/Account';
import ConnectWallet from './components/ConnectWallet';
import useAppContext from "./context/useAppContext"

const App = () => {
    // Define navigation paths as constants
    const STAKE_PATH = 'stake';
    const APPROVE_PATH = 'approve';
    const WITHDRAW_PATH = 'withdraw';
    const CLAIM_PATH = 'claim';
    const context = useAppContext()

    console.log(context)
    // console.log(env)

    return (
        <>
            <nav>
                <NavLink to={STAKE_PATH} >Stake</NavLink>
                <NavLink to={APPROVE_PATH} >Approve</NavLink>
                <NavLink to={WITHDRAW_PATH} >Withdraw</NavLink>
                <NavLink to={CLAIM_PATH} >Claim</NavLink>
                <ConnectWallet />
            </nav>

            <div className="container">
                <Account />
                <Outlet />
                <Balance />
            </div>
            <Toaster />
        </>

    );
}

export default App;