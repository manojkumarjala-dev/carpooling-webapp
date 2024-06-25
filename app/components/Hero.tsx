import React from 'react'
import Image from 'next/image'
function Hero() {
  return (
    <section className='max-container pb-20  sm:bg-[url("/travel.png")] sm:bg-cover sm:bg-[top_10rem_left_16rem] border-red-900 max-container padding-container flex flex-col sm:flex sm:flex-row  sm:pb-80 sm:gap-60 '>
     <div className='relative xl:w-1/2'>
      <div className='flex'>

      <h1 className='bold-52 lg:bold-88 pt-16'>CarHop</h1>
      <Image
        src='/car.svg'
        width={100}
        height={100}
        alt='car'
        className='pt-16'
      >
      </Image>
      </div>
      <p className=''>Join the CarHop Community. Save money, make friends, and reduce your carbon footprint<Image src='/carbon.svg' width={20} height={20} alt='carbon' className='inline'></Image>. CarHop connects you with fellow commuters for a smarter, greener way to travel. Hop in and experience the joy of shared rides today!
</p>
     </div>

     {/*LEFT */}
    </section>
  )
}

export default Hero