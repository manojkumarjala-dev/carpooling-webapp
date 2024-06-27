'use client';
import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { CredentialsSignin } from 'next-auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string| null>(null);
  const router = useRouter();
  const {data:session} = useSession()

  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email,password)
    try {
        const response = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if(response?.error === 'Configuration'){
            setEmail('')
            setPassword('')
            setError('error')
            setTimeout(() => {
              setError(null)
            }, 3000);
        }
        
      } 
      catch (error) {
        const someError = error as CredentialsSignin;
      }
  };

  if(session){
    router.push('/dashboard')
  }
  if(!session){
  return (
    <div className='flex items-center justify-center sm:min-h-screen min-h-[70vh] bg-gray-100 px-10 overflow-hidden'>
      { error &&
        <div className="absolute top-12 sm:left-1/2 left-0 p-4 ">
        <div className="border fixed border-red-400 py-4 flex bg-white gap-2 rounded-xl w-auto px-8 text-bold"><Image src='/error.svg' width={20} height={20} alt="error"></Image><span className="text-red-600 font-bold">Error</span>:<p className="font-bold"> Invalid credentials</p></div>
        </div>
      }
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <h2 className='mb-6 text-2xl font-bold text-center text-gray-700'>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Username</label>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md'
            />
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
          >
            Sign In
          </button>
        </form>
        <p className='mt-4 text-sm text-center text-gray-600'>
          {`Don't have an account?`} <a href='/register' className='font-bold text-blue-600 hover:underline'>Sign Up</a>
        </p>
      </div>
    </div>
  );}
}
