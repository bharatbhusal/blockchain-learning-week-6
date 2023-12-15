import React from 'react'
import "./App.css"
import { Outlet, Link, NavLink } from 'react-router-dom'
import Balance from './components/Balance'
import Account from './components/Account'
import { Toaster } from 'react-hot-toast'


const App = () => {
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
