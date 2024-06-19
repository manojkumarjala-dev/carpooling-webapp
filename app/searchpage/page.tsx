import React from 'react'

function SearchBar() {
  return (
    <div className='w-3/4 flex flex-col mt-[20vh]'>
        <form className='flex justify-center gap-8'>
            <div className='flex flex-col w-1/3'>
                <label className='pl-2 pb-2'>Start Location</label>
                <input placeholder='Enter Start Location' className='p-2 rounded-3xl text-black'></input>
            </div>
            <div className='flex flex-col w-1/3'>
                <label className='pl-2 pb-2'>End Location</label>
                <input placeholder='Enter end Location' className='p-2 rounded-3xl text-black'></input>
            </div>
            <div className='flex flex-col justify-end'>
                <button className='h-1/2 border rounded-lg bg-blue-500 px-4 items-center'>Submit</button>
            </div>
        </form>
        <div className='h-full mt-12 ml-12'>
          results
        </div>
    </div>
  )
}

export default SearchBar