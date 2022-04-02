import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import NftCard from '../components/NftCard'
import { sanityClient } from '../sanity'
import { Collection } from '../typings'
import styles from './marketplace.module.css'

interface Props {
  collections: Collection[]
}

function Marketplace({ collections }: Props) {
  return (
    <div className="bg-[#181A18] ">
      <div className=" mx-auto flex max-w-7xl flex-col  py-20 px-10 2xl:px-0">
        <Head>
          <title>MarketPlace</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Link href="/">
          <h1 className={styles.text}>
            The{' '}
            <span className=" font-extrabold underline decoration-pink-600/50">
              TechnyTeams
            </span>{' '}
            NFT Market Place
          </h1>
        </Link>

        <main className=" rounded-2xl bg-black p-10 shadow-2xl shadow-green-400">
          <div className="grid space-x-2 space-y-12 md:grid-cols-2 md:space-y-0 lg:grid-cols-3 2xl:grid-cols-4 gap-y-4 gap-x-3">
            {collections.map((collection) => (
              <NftCard collection={collection} key={collection._id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Marketplace

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type =="collection"]{
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
  const collections = await sanityClient.fetch(query)
  return {
    props: {
      collections,
    },
  }
}
