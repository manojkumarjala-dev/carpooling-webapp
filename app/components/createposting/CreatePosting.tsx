'use client'
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from 'next/navigation'

const today = new Date();

const formSchema = z.object({
  startLocation: z.string().min(3, { message: "Enter valid Start Location" }), 
  endLocation: z.string().min(3, { message: "Enter valid End Location" }),
  date: z.string().refine((val) => {
    const selectedDate = new Date(val);
    return selectedDate.getTime() >= today.getTime();
  }, { message: "Date cannot be in the past" }),
  time: z.string().refine((val) => {
    const [hours, minutes] = val.split(':').map(Number);
    const now = new Date();
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);
    return selectedTime.getTime() >= now.getTime();
  }, { message: "Time cannot be in the past" }),
  availableSeats: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  notes: z.string().min(10, { message: "Enter the Description" })
})

interface CreatePostProps {
  setTab: Dispatch<SetStateAction<string>>;
}

export default function Createpost(props: CreatePostProps) {
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch('/api/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (response.ok) {
      props.setTab('viewPosting')
    } else {
      console.log(values)
      console.error('Failed to create Posting')
    }
  }

  return (
    <div className='flex justify-center min-h-screen bg-grey-900 sm:w-3/4 sm:py-12 pt-4'>
      <div className='w-full max-w-md px-8 py-8 mx-auto bg-slate-800 rounded-lg shadow-md'>
        <h2 className='mb-6 text-2xl font-bold text-center text-gray-200'>Create-post</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-200">Start Location</label>
            <input
              type="text"
              {...register('startLocation')}
              placeholder="Enter your Start location"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.startLocation && <p className="mt-1 text-sm text-red-600">{errors.startLocation?.message}</p>}
          </div>
          <div>
            <label className="block text-gray-200">End Location</label>
            <input
              type="text"
              {...register('endLocation')}
              placeholder="Enter your End location"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.endLocation && <p className="mt-1 text-sm text-red-600">{errors.endLocation?.message}</p>}
          </div>
          <div>
            <label className="block text-gray-200">Start Time</label>
            <input
              type="text"
              {...register('time')}
              placeholder="Enter start time HH:MM"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time?.message}</p>}
          </div>
          <div>
            <label className="block text-gray-200">Available Seats</label>
            <input
              type="text"
              {...register('availableSeats')}
              placeholder="Number of seats available"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.availableSeats && <p className="mt-1 text-sm text-red-600">{errors.availableSeats?.message}</p>}
          </div>
          <div>
            <label className="block text-gray-200">Date</label>
            <input
              type="date"
              {...register('date')}
              placeholder="Enter your date YYYY-MM-DD"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date?.message}</p>}
          </div>
          <div>
            <label className="block text-gray-200">Description of Trip</label>
            <input
              type="text"
              {...register('notes')}
              placeholder="Enter Description"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes?.message}</p>}
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Create Posting
          </button>
        </form>
      </div>
    </div>
  )
}
