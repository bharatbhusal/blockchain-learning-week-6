import React from 'react'
import { useAppContext } from '../context/useAppContext'
import { useSDK } from '@metamask/sdk-react'

const Balance = () => {
    const { chainId } = useSDK()
    const { ethBalance } = useAppContext()
    return (
        <>
            {ethBalance && chainId === "0x5" ?
                <div className='balance'>

                    <div className="eth-balance">
                        ETH:  {ethBalance.slice(0, 10)}
                    </div>
                    {/* <div className="ethx-balance">
                        ETHx: {ethxBalance.slice(0, 10)}
                    </div> */}
                </div>
                :
                <div style={{
                    fontSize: 1.5 + "rem"
                }}>Please switch to Goerli Network</div >
            }
        </>
    )
}

export default Balance