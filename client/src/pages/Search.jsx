import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row ml-1 flex-wrap mr-10 '>
        <div className='py-7 border-b-2 md:border-r-2 md:min-h-screen '>
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Search item:</label>
                    <input type="text" id='searchitem' placeholder='search...' className='p-3 mr-2 w-full border rounded-lg' />
                </div>
                <div className='flex felx-col gap-2 items-center'>
                    <div className='flex gap-2'>
                        <label className='font-semibold'>Type:</label>
                        <input type="checkbox"  id="all"
                        className='w-5'
                        />
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox"  id="rent" className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox"  id="sale" className='w-5' />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox"  id="offer" className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-col  '>
                    <div className='flex gap-2'>
                    <div className='flex gap-2'>
                        <label className='font-semibold'>Amenities:</label>
                        <input type="checkbox"  id="parking"
                        className='w-5'
                        />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="furnished" className='w-5'  />
                        <span>Furnished</span>
                    </div>
                    </div>
                </div>
                <div className=''>
                    <div className='flex gap-2 items-center'>
                        <label className='font-semibold'>Sort:</label>
                        <select id="sort_order" className='p-3 rounded-lg border'>
                            <option value="">Latest</option>
                            <option value="">Price high to low</option>
                            <option value="">Price low to high</option>
                            <option value="">Oldest</option>

                        </select>
                    </div>
                    <button className='p-3 bg-slate-700 w-full rounded-lg my-4 items-center uppercase text-white'>search</button>

                </div>
            </form>

        </div>


        <div className='border-b-2 '>
            <h1 className='text-3xl p-3 font-semibold text-slate-700 mt-5'>Lisiting Results:</h1>
        </div>
    </div>
  )
}
