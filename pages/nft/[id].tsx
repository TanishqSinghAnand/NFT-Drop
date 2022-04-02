import React, { useEffect, useState } from 'react'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import Link from 'next/link'
import { BigNumber } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'
interface Props {
  collection: Collection
}

function NFTDropPage({ collection }: Props) {
  // ---
  // State and Hooks
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [priceInETH, setPriceInETH] = useState<number>()
  const [loading, setLoading] = useState<boolean>(true)
  const nftDrop = useNFTDrop(collection.address)
  // AUTH
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  // ---

  // Use Effects
  useEffect(() => {
    if (!nftDrop) return
    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll()
      setPriceInETH(Number(claimConditions?.[0].currencyMetadata.displayValue))
    }
    fetchPrice()
  }, [])

  useEffect(() => {
    if (!nftDrop) return

    const fetchNFTDropData = async () => {
      setLoading(true)
      const claimed = await nftDrop.getAllClaimed()
      const total = await nftDrop.totalSupply()

      setClaimedSupply(claimed.length)
      setTotalSupply(total)
      setLoading(false)
    }

    fetchNFTDropData()
  }, [nftDrop])

  // Helpers

  const mintNft = () => {
    if (!nftDrop || !address) return

    setLoading(true)
    const notification = toast.loading(
      `Minting ${quantity} ${quantity == 1 ? 'NFT' : 'NFTs'}`,
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: 'white',
          fontWeight: 'bolder',
          fontSize: '17px',
          padding: '20px',
        },
      }
    )

    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const recipt = tx[0].receipt
        const claimedTokenID = tx[0].id
        const claimedNFT = await tx[0].data()
        toast.success('HOORAY !! You successfully minted your NFT', {
          duration: 8000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: 'green',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error('Oops !! Something went wrong', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: 'red',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })
      })
      .finally(async () => {
        toast.dismiss(notification)
        const claimed = await nftDrop.getAllClaimed()
        const total = await nftDrop.totalSupply()

        setClaimedSupply(claimed.length)
        setTotalSupply(total)
        setQuantity(1)
        setLoading(false)
      })
  }

  return (
    <div className="flex h-screen flex-col bg-black text-white lg:grid lg:grid-cols-10 lg:overflow-y-hidden">
      <Toaster position="bottom-center" />
      {/* Left */}
      <div className="bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2">
            <img
              src={urlFor(collection.previewImage).url()}
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="col-span-6 flex flex-1 flex-col bg-black p-12">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link href={'/marketplace'}>
            <h1 className="w-52 cursor-pointer text-lg font-extralight sm:w-80 ">
              The{' '}
              <span className=" font-extrabold underline decoration-pink-600/50">
                TechnyTeams
              </span>{' '}
              NFT Market Place
            </h1>
          </Link>
          <button
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className="rounded-full bg-rose-400 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? 'Sign Out' : 'Sign In'}
          </button>
        </header>
        <hr className="my-2 border" />
        {address && (
          <p className="text-center  text-sm text-rose-400">
            You are logged in with Wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}

        {/* Content */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            src={urlFor(collection.mainImage).url()}
            className="w-80 object-cover pb-10 lg:h-40"
            alt=""
          />

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>
          {loading ? (
            <p className="animate-pulse pt-2  text-xl text-green-500">
              Loading Suppy Count ...
            </p>
          ) : (
            <p className="pt-2 text-xl  text-green-500">
              {claimedSupply} / {totalSupply?.toString()} NFT's claimed
            </p>
          )}
          {loading && (
            <img
              className="h-14 w-10 object-contain"
              src="/loader.gif"
              alt=""
            />
          )}
        </div>
        {/* Mint BTN */}
        <div className="my-auto mt-5 flex items-center justify-center space-x-5">
          <button
            onClick={mintNft}
            disabled={
              loading ||
              claimedSupply === totalSupply?.toNumber() ||
              !address ||
              quantity == 0
            }
            className="h-16 w-[90%] rounded-full bg-red-500 font-bold text-white shadow-md shadow-white hover:scale-105 disabled:bg-gray-400 disabled:shadow-sm"
          >
            {loading ? (
              <>Loading</>
            ) : claimedSupply == totalSupply?.toNumber() ? (
              <>Sold Out!</>
            ) : !address ? (
              <>Sing in to Mint</>
            ) : quantity == 0 ? (
              <>Select a Number</>
            ) : (
              <span className="font-bold">
                Mint NFT ({Number(priceInETH) * quantity} ETH)
              </span>
            )}
          </button>
          <div className="quantity h-[90%]">
            <input
              type="number"
              min="1"
              className="color-white h-full bg-black text-center text-2xl"
              max="9"
              step="1"
              onChange={(e) => {
                setQuantity(Number(e?.target?.value))
              }}
              value={quantity}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type =="collection" && slug.current == $id][0]{
  _id,
  title,
  address,
  description,
  nftCollectionName,
  mainImage {
   asset
  },
  previewImage {
    asset
  },
  slug {
    current
  },
  creator -> {
    _id,
    name,
    address,
    slug {
      current
    }    
  }
}`

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })

  if (collection._id == undefined) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
    },
  }
}
