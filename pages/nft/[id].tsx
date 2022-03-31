import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'

function NFTDropPage() {
  // AUTH
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  // ---

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* Left */}
      <div className="bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2">
            <img
              src="https://lh3.googleusercontent.com/wDOZrOnLF3pnb4NgJc4KxQS1q5FLZYZ9yfLtUZQ3rDdhwErcgyYy-0zYZ6N8_mmUum61Th8mDG10zRtQsa5uHJ4EZBuzFptLIEP_=w600"
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">Techny Teams Apes</h1>
            <h2 className="text-xl text-gray-300">
              A collection of Apes who live and breathe React!
            </h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="col-span-6 flex flex-1 flex-col p-12">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="w-52 cursor-pointer text-lg font-extralight sm:w-80 ">
            The{' '}
            <span className=" font-extrabold underline decoration-pink-600/50">
              TechnyTeams
            </span>{' '}
            NFT Market Place
          </h1>
          <button
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className="rounded-full bg-rose-400 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? 'Sign Out' : 'Sign In'}
          </button>
        </header>
        <hr className="my-2 border" />
        {address && (
          <p className='text-sm  text-rose-400 text-center'>
            You are logged in with Wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}

        {/* Content */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            src="https://links.papareact.com/bdy"
            className="w-80 object-cover pb-10 lg:h-40"
            alt=""
          />

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            The Techny Teams Ape Coding Club | NFT Drop
          </h1>
          <p className="pt-2 text-xl  text-green-500">13 / 21 NFT's claimed</p>
        </div>
        {/* Mint BTN */}
        <button className="mt-10 h-16 w-full rounded-full bg-red-500 font-bold text-white">
          Mint NFT (0.01 ETH)
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage
