import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import "./App.css";
import Balance from './components/Balance';
import Account from './components/Account';
import { useAppContext } from './context/useAppContext';
import ConnectWallet from './components/ConnectWallet';
import { Signature } from 'ethers';
// import Wallet from './components/Wallet';

const App = () => {
  // Define navigation paths as constants
  const STAKE_PATH = 'stake';
  const APPROVE_PATH = 'approve';
  const WITHDRAW_PATH = 'withdraw';
  const CLAIM_PATH = 'claim';
  const context = useAppContext()

  console.log(context)
  return (
    <>
      <nav>
        {/* NavLink components for each navigation item */}
        <NavLink to={STAKE_PATH} >Stake</NavLink>
        <NavLink to={APPROVE_PATH} >Approve</NavLink>
        <NavLink to={WITHDRAW_PATH} >Withdraw</NavLink>
        <NavLink to={CLAIM_PATH} >Claim</NavLink>
        <ConnectWallet />
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

  );
}

export default App;
