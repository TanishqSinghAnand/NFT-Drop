import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import styles from './index.module.css'

interface Props {
  collections: Collection[]
}

const Home = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-[#29ffc6] via-[#20e3b2] to-[#0cebeb] text-white">
      <Head>
        <title>NFT DROP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex max-w-[70%] flex-col items-center justify-center space-y-1">
        <h3 className="font-bold text-lg text-gray-600">Welcome to Delta</h3>
        <h1 className="text-center text-7xl font-extrabold text-gray-900">
          <span className={styles.rainbow}>
          The most advanced NFT Drop MarketPlace.
          </span>
        </h1>
      </div>
      <Link href="/marketplace">
        <button className="mt-6 rounded-full bg-gradient-to-r from-[#0187da] to-[#b631a7] p-3 font-bold text-white">
          Check out MarketPlace
        </button>
      </Link>
    </div>
  )
}

export default Home

