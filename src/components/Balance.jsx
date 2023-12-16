import React from 'react'
import { useAppContext } from '../context/useAppContext'
import { useSDK } from '@metamask/sdk-react'

const Balance = () => {
    const { ethBalance, ethxBalance } = useAppContext()
    return (
        <>
            {ethBalance && ethxBalance &&
                <div className='balance'>

                    <div className="eth-balance">
                        ETH:  {ethBalance.slice(0, 10)}
                    </div>
                    <div className="ethx-balance">
                        ETHx: {ethxBalance.slice(0, 10)}
                    </div>
                </div>
            }
        </>
    )
}

export default Balance