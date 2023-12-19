import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Balance from './components/Balance'
import Account from './components/Account'
import ConnectWallet from './components/ConnectWallet'
import { useAppContext } from './context/useAppContext'
import "./App.css"

const App = () => {
  // Render the main navigation links
  const renderNavLink = (to, text) => (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        isActive ? 'active' : isPending ? 'pending' : ''
      }
    >
      {text}
    </NavLink>
  )

  return (
    <>
      {/* Navigation */}
      <nav>
        {renderNavLink('stake', 'Stake')}
        {renderNavLink('approve', 'Approve')}
        {renderNavLink('withdraw', 'Withdraw')}
        {renderNavLink('claim', 'Claim')}
        <ConnectWallet />
      </nav>

      {/* Main Content */}
      <div className="container">
        <Account />
        <Outlet />
        <Balance />
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </>
  )
}

export default App
