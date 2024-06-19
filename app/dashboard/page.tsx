'use client'
import React, { useState } from 'react'
import LeftNav from '../components/LeftNav'
import { auth } from '../auth'
import SearchBar from '../searchpage/page'
import Createpost from '../components/createposting/CreatePosting'
function Dashboard() {
  const [tab,setTab] = useState('viewPosting')
  
  return (
    <div className='flex'>
      <LeftNav setTab={setTab}></LeftNav>
      {
        tab==='createPosting' && <Createpost setTab={setTab}></Createpost>
      }
      {
        tab==='managePosting' && <>manage Postings</>
      }
      {
        tab==='viewPosting' && <SearchBar></SearchBar>
      }
    </div>
  )
}

export default Dashboard