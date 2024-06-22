'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Table from './table'


const formSchema = z.object({
  startLocation: z.string().optional(),
  endLocation: z.string().optional(),
}).refine((data) => data.startLocation || data.endLocation, {
  message: "Either Start Location or End Location must be filled",
  path: ["startLocation"],
});



function SearchBar() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
    },
  })

  async function onSubmit(values : z.infer<typeof formSchema>) {
    const response = await fetch('/api/get-postings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
  
    if (response.ok) {
      const data = await response.json();
      console.log("coming here")
        setResponseData(data.posts);
    } else {
      console.error('SomeThing went wrong')
    }
  }

  
  return (
    <div className='w-3/4 flex flex-col pt-[20vh] bg-gray-100'>
        <form className='flex justify-center gap-8' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col w-1/3'>
                <label className='pl-4 pb-2 text-black'>Start Location</label>
                <input placeholder='Enter Start Location' className='p-2 pl-4 rounded-3xl text-black border-black border' type="text"
              {...register('startLocation')}></input>
              
            </div>
            <div className='flex flex-col w-1/3'>
                <label className='pl-4 pb-2 text-black'>End Location</label>
                <input placeholder='Enter end Location' className='p-2 pl-4 rounded-3xl text-black border-black border transition' type="text"
              {...register('endLocation')}></input>
              {errors.endLocation && <p className="mt-1 text-sm text-red-600">{errors.endLocation.message}</p>}
            </div>
            <div className='flex flex-col justify-end'>
                <button type="submit" className='h-1/2 border rounded-lg bg-blue-500 px-4 items-center'>Submit</button>
            </div>
        </form>
        {errors.startLocation && <p className="mt-1 text-sm pl-8 pt-4 text-red-600">{errors.startLocation.message}</p>}

        {
          responseData && <Table data={responseData}></Table>
        }

    </div>
  )
}

export default SearchBar