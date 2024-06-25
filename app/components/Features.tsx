import React from 'react'
import { FEATURES } from '@/constants'
import Image from 'next/image'
function Features() {
  return (
    <section className='py-5 min-h-screen sm:min-h-[40vh]'>
      <div className='max-container padding-container relative w-full justify-end '>
        <h2 className='bold-32 lg:bold-52 '>Our Features</h2>
        <div className='flex flex-col sm:flex-row justify-around gap-8 pt-8'>
        {
          FEATURES.map(feature=>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-4'>
              <h1 className='bold-16'>{feature.title}</h1>
              <Image src={feature.icon} width={30} height={30} alt='logo'></Image>
              </div>
              <p>{feature.description}</p>
            </div>
            )
        }
        </div>
      </div>
    </section>
  )
}

export default Features