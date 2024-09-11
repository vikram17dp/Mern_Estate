import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 flex-1 mx-auto max-w-4xl'>
        <h1 className='text-3xl text-center my-3 font-semibold'>Create a Listning</h1>
        <form className='flex flex-col sm:flex-row gap-10 my-8' >
        <div className='flex flex-1 flex-col gap-4'>
            <input type="text" placeholder='Name' id='name' maxLength='63' minLength='5' className='p-3 rounded-lg ' required />
            <textarea  id="description" placeholder='Description' required  className='border p-3  rounded-lg'></textarea>
            <input type="text " placeholder='Address' className='p-3 rounded-lg' required />

            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-6'>
                    <input type="checkbox" id='sale' className='w-5' />
                    <span>sell</span>
                </div>
                <div className='flex gap-6'>
                    <input type="checkbox" id='rent' className='w-5' />
                    <span>Rent</span>
                </div>
                <div className='flex gap-6'>
                    <input type="checkbox" id='parking' className='w-5' />
                    <span>Parking spot</span>
                </div>
                <div className='flex gap-6'>
                    <input type="checkbox" id='furnished' className='w-5' />
                    <span>Furnished</span>
                </div>
                <div className='flex gap-6'>
                    <input type="checkbox" id='offer' className='w-5' />
                    <span>offer</span>
                </div>
            </div>
            <div className='flex flex-wrap gap-6 my-4'>
                <div className='flex gap-2 items-center'>
                    <input type="number" className='p-3 border border-gray-600 rounded-lg'
                    min='1'
                    required
                    max='10'
                    />
                    <p>Beds</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="number" className='p-3 border border-gray-600 rounded-lg'
                    min='1'
                    required
                    max='10'
                    />
                    <p>Baths</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="number" className='p-3 border border-gray-600 rounded-lg'
                    min='1'
                    required
                    max='10'
                    />
                    <div>
                        <p>Regular Price</p>
                        <span>($ / month)</span>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="number" className='p-3 border border-gray-600 rounded-lg'
                    min='1'
                    required
                    max='10'
                    />
                    <div>
                        <p>Discounted Price</p>
                        <span>($ / month)</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-1 flex-col gap-4 '>
            <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600'>The first image will be cover (max-6)</span>
            </p>
            <div className='flex gap-4'>
                <input type="file" id='images' accept='image/*' className='p-3 border border-gray-600 rounded w-full'  />
                <button className='p-3 boder border-green-600 text-green-500'>Upload</button>
            </div>

        <button className='p-3 border bg-gray-700 text-white my-3 uppercase rounded-lg'>create Listing</button>
        </div>
        </form>
    </main>
  )
}
