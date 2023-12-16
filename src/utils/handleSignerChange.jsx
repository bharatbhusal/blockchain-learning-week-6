export const handleSignerChange = async (setSigner) => {

    const newSigner = await window.ethereum.request({
        method: "eth_requestAccounts"
    })

    setSigner(newSigner)

}