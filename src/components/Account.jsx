import React from 'react'
import { useAppContext } from '../context/useAppContext'

const Account = () => {
    const { signer } = useAppContext()
    return (
        <>
            {signer &&
                <div className="account">
                    <div className="wallet">
                        Wallet: {signer.address.slice(0, 10) + "...." + signer.address.slice(35,)}
                    </div>
                    <div className="chain">
                        Chain: Goerli
                    </div>
                </div>}
        </>
    )
}

export default Account