'use client'
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  username: z.string().min(6, { message: "Enter valid Username" }),
  email: z.string().email({ message: "Enter valid email" }),
  password: z.string().min(8, { message: "Password should contain min 8 characters" })
})

function Register() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values : z.infer<typeof formSchema>) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (response.ok) {
      router.push('/api/auth/signin')
    } else {
      console.log(values)
      console.error('Failed to register user')
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-zinc-200'>
      <div className='w-full max-w-md px-8 py-8 mx-auto bg-white rounded-lg shadow-md'>
        <h2 className='mb-6 text-2xl font-bold text-center text-gray-800'>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              {...register('username')}
              placeholder="Enter your Username"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              placeholder="Enter your Email"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              id='toggler'
              type="password"
              {...register('password')}
              placeholder="Enter your password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-gray-900"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>
          <div className='flex items-center'>
            <input type="checkbox" id="show-password" onClick={() => {
              const passwordInput = document.getElementById('toggler') as HTMLInputElement;
              if (passwordInput) {
                passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
              }
            }} />
            <label htmlFor="show-password" className='ml-2 text-sm text-gray-800'>Show password</label>
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Register
          </button>
        </form>
        <p className='pt-4 text-sm text-center text-gray-800'>Already have an account? <Link href='/login' className='font-bold text-gray-900 hover:text-blue-500'>Sign In</Link></p>
      </div>
    </div>
  )
}

export default Register
