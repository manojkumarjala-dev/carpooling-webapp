import { motion } from "framer-motion"
import React from 'react'
function Preferences() {
  return (
    <div className='text-black text-mg font-bold'>
        <h2>Preferences</h2>
        <div className='flex gap-4 pt-2'>
        <motion.img 
            src='/nosmoke.svg' 
            width='50' 
            height='50' 
            alt='No-Smoke' 
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y:0 }} 
            transition={{duration:1}}
            className=''>
        </motion.img>
        <motion.img 
            src='/nopets.svg' 
            width='50' 
            height='50' 
            alt='No-Pets' 
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y:0 }} 
            transition={{duration:1}}
            className=''>
        </motion.img>
        </div>
    </div>
  )
}

export default Preferences