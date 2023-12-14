import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/useAppContext'
import Stake from './components/Stake'
import Approve from './components/Approve'
import Withdraw from './components/Withdraw'

const App = () => {
  return (
    <div>
      <Stake />
      <Approve />
      <Withdraw />
      <Toaster />
    </div>
  )
}

export default App