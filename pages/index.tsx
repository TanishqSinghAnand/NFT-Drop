import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import styles from './index.module.css'
// import Bounce from 'react-reveal/Bounce'
import Typed from 'react-typed'

interface Props {
  collections: Collection[]
}

const Home = () => {
  return (
    <div className='min-w-screen h-screen'>

      <Head>
        <title>NFT DROP</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-gradient-to-br from-[#29ffc6] via-[#20e3b2] to-[#0cebeb] text-white">

      <div className="flex md:max-w-[70%] flex-col items-center justify-center space-y-1">
        <h3 className="text-lg font-bold text-gray-600">Welcome to Delta</h3>
        <h1 className="text-center text-2xl lg:text-7xl font-extrabold text-gray-900">
          <span className={styles.rainbow}>
              The most advanced NFT Drop MarketPlace.
          </span>
        </h1>
      </div>
      <Link href="/marketplace">
        <button className="mt-6 rounded-full bg-gradient-to-r from-[#0187da] to-[#b631a7] p-3 font-bold text-white animate-pulse">
          Check out MarketPlace
        </button>
      </Link>
    </div>
    </div>
  )
}

export default Home
