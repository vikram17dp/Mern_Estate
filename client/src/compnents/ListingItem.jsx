import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'

export default function ListingItem({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg h-200px w-350px transition-shadow flex-col flex overflow-hidden sm:w-[350px] sm:h-[380px] sm:mx-auto rounded-lg gap-2 mt-2 mb-2 w-full max-w-sm'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt="Listing cover" className='h-[220px] w-[330px] object-cover sm:h-[200px] sm:w-[320px] rounded-lg mx-auto mt-2 transition-scale hover:scale-105 duration-300'/>
        </Link>
        <div className='p-3 '>
        <h1 className='text-xl text-slate-600 font-semibold truncate mt-1'>{listing.name}</h1>
        <div className='flex gap-1 mt-2 text-center'>
        <MdLocationOn className='text-green-700 items-center justify-center mt-1'/>
        <p className='text-sm items-center justify-center truncate'>{listing.address}</p>
        </div>
        <div className='mt-2'>
        <p className='text-sm truncate'>{listing.description}</p>
        </div>
        <p className='text-md text-slate-500 font-semibold mt-2'>
         $ {listing.offer ? listing.discountPrice.toLocaleString('en-Us') : listing.regularPrice.toLocaleString('en-Us')} 
         {listing.type === 'rent'&&'/month'}
        </p>
        <div className='flex gap-3 text-slate-800 mt-2'>
          <div className='font-bold text-sm'>
            {listing.bedrooms>1 ? `${listing.bedrooms} beds` :`${listing.bedrooms}bed `}
          </div>
          <div className='font-bold text-sm'>
            {listing.bathroom>1 ? `${listing.bathrooms} bath` : `${listing.bathrooms} baths`}
          </div>
        </div>
        
        </div>
    </div>
  )
}
