'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import LeftNav from '../components/LeftNav'
import SearchBar from '../searchpage/page'
import Createpost from '../components/createposting/CreatePosting'

function Dashboard() {
  const [tab, setTab] = useState('viewPosting')
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'authenticated') {
    return (
      <div className='sm:flex flex flex-col'>
        <LeftNav setTab={setTab}></LeftNav>
        {
          tab === 'createPosting' && <Createpost setTab={setTab}></Createpost>
        }
        {
          tab === 'managePosting' && <>manage Postings</>
        }
        {
          tab === 'viewPosting' && <SearchBar></SearchBar>
        }
      </div>
    )
  }

  return null; // Or you can return a loading spinner or any placeholder here
}

export default Dashboard
