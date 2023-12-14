import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/useAppContext'
import Stake from './components/Stake'

const App = () => {
  return (
    <div>
      <Stake />
      <Toaster />
    </div>
  )
}

export default App