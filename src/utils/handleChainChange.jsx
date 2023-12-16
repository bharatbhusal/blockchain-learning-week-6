export const handleChainChange = async (setChain) => {

    let newChain = await window.ethereum.request({
        method: 'eth_chainId'
    })
    setChain(newChain)
}