'use client'
import { motion } from "framer-motion"
import React, { useState, useEffect } from 'react';
import Preferences from './Preferences';
import Image from "next/image";
import { ObjectId } from 'mongodb';
interface Trip {
    posting:{
        _id: ObjectId;
        user: ObjectId;
        startLocation: string;
        endLocation: string;
        date: Date;
        time: string;
        availableSeats: number;
        occupiedSeats: number;
        occupants: string[]; 
        notes: string;
        createdAt: Date;
        __v: number;
    }
  }
  interface User {
    username:string,
    email:string,
  }
export default function Page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Trip | null>(null);
  const [postedBy, setPostedBy] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seatloading, setseatLoading] = useState(true);
  

  const occupySeat = async () =>{
    try{
      const response = await fetch(`/api/occupy-seat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({postId:params.slug})
      });
      if(!response.ok){
        throw new Error(`Something went wrong! Status: ${response.status}`)
      }
      setseatLoading(false)
    }
    catch(error: any){
      console.log(error)
    }

  }

  useEffect(() => {
    async function fetchData() {
      if (!params || !params.slug) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/posting/${encodeURIComponent(params.slug)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPost(data);
        const user = await fetch(`/api/user/${encodeURIComponent(data.posting.user)}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!user.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await user.json();
        setPostedBy(userData)
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My Post: {params.slug}</h1>
      <div className="flex min-h-screen w-full min-h-scree bg-gray-100 sm:p-16 sm:px-48">
      {post && 
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h2 className="text-black text-2xl font-bold mb-4 text-center">Trip Details</h2>
            <div className='flex justify-center sm:gap-8'>
                <div className="flex flex-col justify-center">
                    <h3 className='text-black text-xl font-bold items-center'>{post.posting.startLocation}</h3>
                </div>
                <motion.img 
                    src='/arrow.svg' 
                    width='50' 
                    height='50' 
                    alt='No-Smoke' 
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x:0 }} 
                    transition={{duration:1}}
                    className=''>
                </motion.img>
                <div className="flex flex-col justify-center">
                    <h3 className='text-black text-xl font-bold items-center'>{post.posting.endLocation}</h3>
                </div>
            </div>
            <div className='w-full h-2 bg-gray-200'></div>
            <div className='flex justify-between items-center sm:px-[2vw] py-4'>
                <p className="mx-4 text-black"><span className="font-semibold text-black">Date:</span> {new Date(post.posting.date).toLocaleDateString()}</p>
                <p className="mx-4 text-black"><span className="font-semibold text-black">Time:</span> {post.posting.time}</p>
                <p className="mx-4 text-black"><span className="font-semibold text-black">Available Seats:</span> {post.posting.availableSeats}</p>
            </div>
            <div className='w-full h-2 bg-gray-200'></div>
            <div>
                <p className="my-2 text-black"><span className="font-semibold text-black">Occupied Seats:</span> {post.posting.occupiedSeats}</p>
                <p className="my-2 text-black"><span className="font-semibold text-black">Notes:</span> {post.posting.notes}</p>
            </div>
            <div className='w-full h-2 bg-gray-200'></div>
            <div>
                {
                    postedBy && 
                    <div className="text-black">
                        Posted By: {postedBy.username}
                    </div>
                }
            </div>

            <div className='w-full h-2 bg-gray-200'></div>
                <Preferences></Preferences>
                {
                  seatloading&&<button className="mt-2 text-white bg-sky-500 flex items-center p-2 gap-2 rounded-2xl hover:scale-x-110 origin-left transition" onClick={occupySeat}>Request to book <Image src={'/reserve.svg'} width='30' height='30' alt="Reservation" className=""></Image></button>
                }
                {
                  !seatloading&&<button className="mt-2 text-white bg-sky-500 flex items-center p-2 gap-2 rounded-2xl hover:scale-x-110 origin-left transition">Unbook<Image src={'/reserve.svg'} width='30' height='30' alt="Reservation" className=""></Image></button>
                }   
       </div>
       
       
       }
       
    </div>
    
    </div>
  );
}
