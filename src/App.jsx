import React, { useEffect, useState } from 'react'
import "./App.css"
import { Outlet, NavLink, useSearchParams } from 'react-router-dom'
import Balance from './components/Balance'
import Account from './components/Account'
import { Toaster } from 'react-hot-toast'
import ConnectWallet from './components/ConnectWallet'
import { useAppContext } from './context/useAppContext'



const App = () => {
  // const context = useAppContext()
  // console.log(context)

  return (
    <>
      <nav>
        <NavLink
          to={`stake`}
          className={({ isActive, isPending }) =>
            isActive
              ? "active"
              : isPending
                ? "pending"
                : ""
          }
        >
          Stake
        </NavLink>
        <NavLink
          to={`approve`}
          className={({ isActive, isPending }) =>
            isActive
              ? "active"
              : isPending
                ? "pending"
                : ""
          }
        >
          Approve
        </NavLink>
        <NavLink
          to={`withdraw`}
          className={({ isActive, isPending }) =>
            isActive
              ? "active"
              : isPending
                ? "pending"
                : ""
          }
        >
          Withdraw
        </NavLink>
        <NavLink
          to={`claim`}
          className={({ isActive, isPending }) =>
            isActive
              ? "active"
              : isPending
                ? "pending"
                : ""
          }
        >
          Claim
        </NavLink>
        <ConnectWallet />
      </nav>


      <div className="container" >
        <Account />
        <Outlet />
        <Balance />
      </div >

      <Toaster />
    </>
  )
}

export default App
