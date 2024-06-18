import React from 'react'
import { auth } from "@/app/auth"
 async function routing() {
    const session = await auth()
    if(session){
      console.log(session)
        return (
            <div>dashboard</div>
          )
    }
  return (
    <div>No Acess</div>
  )
}

export default routing