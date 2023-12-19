import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/useAppContext'

const Account = () => {
    const { signer, chainId } = useAppContext()


    return (
        <>{signer && chainId &&
            <div className="account">
                <div className="wallet">
                    Wallet: {signer.address.slice(0, 10) + "...." + signer.address.slice(35,)}
                </div>
                <div className="chain">
                    Chain: {chainId === "0x5" ? "Goerli" : <div style={{ color: "red" }}>Not supported</div>}
                </div>
            </div>}
        </>
    )
}

export default Account