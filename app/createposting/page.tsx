'use client'
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { auth } from '@/app/auth';


const formSchema = z.object({

  startLocation:z.string().min(3, { message: "Enter valid Username" }), 
  endLocation:z.string().min(3, { message: "Enter valid Username" }),
  date:z.string().date(), 
  time:z.string().time(), 
  availableSeats:z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"}),
  notes:z.string().min(10,{message:"Enter the Description"})
})

export function page() {
    
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        startLocation: "",
        endLocation: "",
        date: "",
        time: "",
        availableSeats: "",
        notes: "",
    },
  })

  async function onSubmit(values : z.infer<typeof formSchema>) {
    const response = await fetch('/api/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (response.ok) {
      router.replace('/dashboard')
    } else {
      console.log(values)
      console.error('Failed to create Posting')
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-zinc-200'>
      <div className='w-full max-w-md px-8 py-8 mx-auto bg-white rounded-lg shadow-md'>
        <h2 className='mb-6 text-2xl font-bold text-center text-gray-800'>Create-post</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Start Location</label>
            <input
              type="text"
              {...register('startLocation')}
              placeholder="Enter your Start location"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.startLocation && <p className="mt-1 text-sm text-red-600">{errors.startLocation.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">end Location</label>
            <input
              type="text"
              {...register('endLocation')}
              placeholder="Enter your Start location"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.endLocation && <p className="mt-1 text-sm text-red-600">{errors.endLocation.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Start Time</label>
            <input
              type="string"
              {...register('time')}
              placeholder="Enter start time HH:MM:SS"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">available Seats</label>
            <input
              type="text"
              {...register('availableSeats')}
              placeholder="Number of seats available"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.availableSeats && <p className="mt-1 text-sm text-red-600">{errors.availableSeats.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              {...register('date')}
              placeholder="Enter your date YYYY-MM-DD"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Description of Trip</label>
            <input
              type="text"
              {...register('notes')}
              placeholder="Enter Description"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>}
          </div>
         
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Create Posting
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default page
