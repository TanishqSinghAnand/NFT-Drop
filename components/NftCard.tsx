import { urlFor } from '../sanity'
import { Collection } from '../typings'
import 'ui-neumorphism/dist/index.css'
import { Body2, Card, CardContent, H5, Subtitle2 } from 'ui-neumorphism'
import Link from 'next/link'
import styles from './NftCard.module.css'

interface Props {
  collection: Collection
}

function NftCard({ collection }: Props) {
  return (
    <div className="shadow-pink-900 rounded-3xl col-span-1 transition-all bg-[#1b1b1b] p-1  text-white shadow-xl duration-200 hover:scale-105">
      <Link href={`/nft/${collection.slug.current}`}>
        <div className="flex cursor-pointer flex-col items-center mx-2 my-3">
          <img
            className="h-96 w-60 rounded-2xl object-cover"
            src={urlFor(collection.mainImage).url()}
            alt=""
          />
          <div className="flex flex-col items-center justify-center p-5">
            <h2 className="text-3xl ">{collection.title}</h2>
            <p className="mt-2 text-sm text-gray-400">
              {collection.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NftCard
