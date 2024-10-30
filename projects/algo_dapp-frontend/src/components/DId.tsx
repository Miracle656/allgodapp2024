import React, { useState } from 'react'
import algosdk from 'algosdk'

function DId() {

  const [address, setAddress] = useState<any>('')
  const [privatekey, setPrivatekey] = useState<Uint8Array | null>(null)
  const [didhash, setDidHash] = useState<string>('')

  const createDID = async () => {
    const account = algosdk.generateAccount()
    setAddress(account.addr)
    setPrivatekey(account.sk)

    const didDocument = { id: `did:algorand:${account.addr}` }
    const didDocumentHash = algosdk.encodeObj(didDocument)

    setDidHash(didDocumentHash.toString())

    // const params = await AlgodClient.get
  }

  return (
    <div>DId</div>
  )
}

export default DId
