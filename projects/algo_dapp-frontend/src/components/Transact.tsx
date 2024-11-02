import * as algokit from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'
import { useAppContext } from '../../AppPeovider'

interface TransactInterface {
  openModal: boolean
  setModalState: (value: boolean) => void
}

const Transact = ({ openModal, setModalState }: TransactInterface) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { setAppID } = useAppContext()
  const [receiverAddress, setReceiverAddress] = useState<string>('6PLHRYYTROJWDL7NOYKD3TDAAZM2WLVYH4ADT5CEHDQBRVYP2NJVDJDCZ4')

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })

  const { enqueueSnackbar } = useSnackbar()

  const { signer, activeAddress, signTransactions, sendTransactions } = useWallet()

  const handleSubmitAlgo = async () => {
    setLoading(true)

    if (!signer || !activeAddress) {
      enqueueSnackbar('Please connect wallet first', { variant: 'warning' })
      return
    }

    const suggestedParams = await algodClient.getTransactionParams().do()

    const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: activeAddress,
      to: receiverAddress,
      amount: 1e6,
      suggestedParams,
    })

    const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)

    const signedTransactions = await signTransactions([encodedTransaction])

    const waitRoundsToConfirm = 4

    try {
      enqueueSnackbar('Sending transaction...', { variant: 'info' })
      const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
      enqueueSnackbar(`Transaction sent: ${id}`, { variant: 'success' })
      setAppID(id)
    } catch (e) {
      enqueueSnackbar('Failed to send transaction', { variant: 'error' })
    }

    setLoading(false)
  }

  return (
    <dialog id="transact_modal" className={`modal ${openModal ? 'modal-open' : ''} bg-slate-200`} style={{ display: openModal ? 'block' : 'none' }}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Send payment transaction</h3>
        <br />
        {/* <input
          type="text"
          data-test-id="receiver-address"
          placeholder="Provide wallet address"
          className="input input-bordered w-full"
          value={receiverAddress}
          onChange={(e) => {
            setReceiverAddress(e.target.value)
          }}
        /> */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }} className="modal-action grid">
          <button style={{
            cursor: "pointer",
            borderRadius: "30px",
            width: "20rem",
            padding: ".7rem",
            fontSize: "1.1rem",
            color: "white",
            backgroundColor: "black"
          }}
            data-test-id="send-algo"
            className={`btn ${receiverAddress.length === 58 ? '' : 'btn-disabled'} lo`}
            onClick={handleSubmitAlgo}
          >
            {loading ? <span className="loading loading-spinner" /> : 'Send 1 Algo'}
          </button>
          <button style={
            {
              cursor: "pointer",
              borderRadius: "30px",
              width: "20rem",
              padding: ".7rem",
              fontSize: "1.1rem",
              color: "white",
              backgroundColor: "black"
            }
          } className="btn" onClick={() => setModalState(!openModal)}>
            Close
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default Transact
