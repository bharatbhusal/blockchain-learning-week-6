import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import "./App.css";
import Balance from './components/Balance';
import Account from './components/Account';
import { useAppContext } from './context/useAppContext';
import { useSDK } from '@metamask/sdk-react';
import ConnectWallet from './components/ConnectWallet';

const App = () => {
  // Define navigation paths as constants
  const STAKE_PATH = 'stake';
  const APPROVE_PATH = 'approve';
  const WITHDRAW_PATH = 'withdraw';
  const CLAIM_PATH = 'claim';
  const { connected, chainId } = useSDK()
  const { ethBalance, ethxBalance } = useAppContext()

  return (

    <>
      <ConnectWallet />

      {connected && chainId === "0x5" && ethBalance && ethxBalance ?
        <>
          <nav>
            {/* NavLink components for each navigation item */}
            <NavLink to={STAKE_PATH} >Stake</NavLink>
            <NavLink to={APPROVE_PATH} >Approve</NavLink>
            <NavLink to={WITHDRAW_PATH} >Withdraw</NavLink>
            <NavLink to={CLAIM_PATH} >Claim</NavLink>
          </nav>

          {/* Main content container */}

          <div className="container">
            {/* Account component */}
            <Account />

            {/* Outlet for rendering nested routes */}
            <Outlet />

            {/* Balance component */}
            <Balance />
          </div>
          {/* Toast notifications */}
          <Toaster />
        </>
        : <></>}
    </>

  );
}

export default App;
