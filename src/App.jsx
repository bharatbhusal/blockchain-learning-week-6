import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/useAppContext'
import Stake from './components/Stake'
import Approve from './components/Approve'

const App = () => {
  return (
    <div>
      <Stake />
      <Approve />
      <Toaster />
    </div>
  )
}

export default App