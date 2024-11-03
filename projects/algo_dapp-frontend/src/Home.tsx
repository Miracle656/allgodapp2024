// src/components/Home.tsx
import { useWallet } from '@txnlab/use-wallet'
import React, { useState } from 'react'
import ConnectWallet from './components/ConnectWallet'
import Transact from './components/Transact'
import AppCalls from './components/AppCalls'
import logo from './assets/algodidlogo.png'
import { useAppContext } from '../AppPeovider'



interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()
  const [userAlgoDID, setUserAlgoDID] = useState("")
  const { appID } = useAppContext()


  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal)
  }

  const toggleAppCallsModal = () => {
    setAppCallsDemoModal(!appCallsDemoModal)
  }



  return (
    <div className="hero min-h-screen" style={{
      backgroundColor: "white"
    }}>
      <div className="hero-content text-center rounded-lg p-6 w-full bg-white">
        <img style={{
          width: "2rem",
          position: "absolute",
          left: "2rem",
          top: "50px"
        }} src={logo} alt="algodidlogo" />
        <div className="">
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}>
            <div style={{
              border: "1px solid grey",
              padding: "1rem",
              borderRadius: "6rem",
              width: "fit-content",
              position: "absolute",
              left: "55rem",
              top: "30rem"
            }}>
              judithetugbo.algo.id
            </div>
            <div style={{
              border: "1px solid grey",
              padding: "1rem",
              borderRadius: "6rem",
              width: "fit-content",
              position: "absolute",
              left: "25rem",
              top: "35rem"
            }}>
              devosaurus.algo.id
            </div>
            <div style={{
              border: "1px solid grey",
              padding: "1rem",
              borderRadius: "6rem",
              width: "fit-content",
              position: "absolute",
              left: "40rem",
              top: "3rem"
            }}>
              eyitayoanjorin.algo.id
            </div>
            <div style={{
              border: "1px solid grey",
              padding: "1rem",
              borderRadius: "6rem",
              width: "fit-content",
              position: "absolute",
              left: "80rem"
            }}>
              iamskyful.algo.id
            </div>
            <div style={{
              border: "1px solid grey",
              padding: "1rem",
              borderRadius: "6rem",
              width: "fit-content",
              position: "absolute",
              left: "3rem"
            }}>
              jackofweb3.algo.id
            </div>
            <h1 className="text-4xl font-bold">
              AlgoDID
            </h1>
            <input type="text" style={{
              width: "100%",
              padding: "1rem",
              textAlign: "center",
              borderRadius: "3rem",
              fontSize: "1.5rem"
            }} onChange={(e) => {
              setUserAlgoDID(e.target.value)
            }} value={userAlgoDID} placeholder='Type here... .algo.id' />
          </div>
          <p className="py-6">
            Generate a verifiable Decentralized digital Identity
          </p>

          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }} className="grid">
            {/* <a
              data-test-id="getting-started"
              className="btn btn-primary m-2"
              target="_blank"
              href="https://github.com/algorandfoundation/algokit-cli"
            >
              Getting started
            </a> */}

            <div className="divider" />
            <button style={{
              position: "absolute",
              right: "2rem",
              top: "50px",
              cursor: "pointer",
              borderRadius: "30px",
              width: "10rem",
              padding: ".7rem",
              fontSize: "1rem",
              color: "white",
              backgroundColor: "black"
            }} data-test-id="connect-wallet" className="btn m-2" onClick={toggleWalletModal}>
              {
                activeAddress ? activeAddress : "Connect Wallet"
              }
            </button>

            <div>
              DID: {appID == "" ? null : `${userAlgoDID}.algo.id`}
            </div>

            {activeAddress && (
              <button style={{
                cursor: "pointer",
                borderRadius: "30px",
                width: "10rem",
                padding: ".7rem",
                fontSize: "1.1rem",
                color: "white",
                backgroundColor: "black"
              }} data-test-id="transactions-demo" className="btn m-2" onClick={toggleDemoModal}>
                get id
              </button>
            )}

            {/* {activeAddress && (
              <button data-test-id="appcalls-demo" className="btn m-2" onClick={toggleAppCallsModal}>
                Contract Interactions Demo
              </button>
            )} */}
          </div>

          <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
          <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
          <AppCalls openModal={appCallsDemoModal} setModalState={setAppCallsDemoModal} />
        </div>
      </div>
    </div>
  )
}

export default Home
