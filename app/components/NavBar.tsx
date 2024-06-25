'use client'
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { NAV_LINKS } from "@/constants"
import Button from "./Button"
import { useState } from "react"
function NavBar() {
    const {data:session} = useSession()
    const [menuSelected,setMenuSelected] = useState(false)
  return (
    <div className="flex flex-col w-full">

    <nav className="border pb-2 relative z-30 shadow-lg flex justify-around">
        <Link href='/'>
            <Image src='/logoname.svg' width='250' height='40' alt='logoname'></Image>
        </Link>
        {!session  && <ul className="hidden h-fulll gap-12 sm:flex">
            {
                NAV_LINKS.map(heading => 
                    <Link href={heading.href} key={heading.key} className="flex text-gray-500 items-center pt-2 hover:text-gray-900 hover:underline hover:underline-offset-4 decoration-red-700">
                        {heading.label}
                    </Link>)
            }
        </ul>}
        <div className="flex sm:hidden mt-2">
        <button onClick={()=>setMenuSelected(prev=>!prev)}>
            <Image src='/menu.svg' width={28} height={28} alt="menu" ></Image>
        </button>
        </div>

        {!session && <Link className="hidden sm:flex" href={'/api/auth/signin'}>
        <button className={`rounded-2xl px-4 mt-2 w-28 text-white bg-black`}>Login</button> 
        </Link>}
        {
            session && <Link className="hidden sm:flex" href={'/api/auth/signout'}>
            <button className={`rounded-2xl px-4 mt-2 w-28 text-white bg-black`}>Sign out</button> 
            </Link>
        }
    </nav>
        {menuSelected && <div className="relative flex items-center justify-center sm:hidden opacity-80 w-full mt-2 transition">
            <ul className="h-fulll gap-12 w-full ">
                    {
                        NAV_LINKS.map(heading => 
                            <Link href={heading.href} key={heading.key} className="flex text-gray-500 justify-center pb-2 pt-4 hover:text-gray-900 shadow-md">
                                {heading.label}
                            </Link>)
                    }
            </ul>
        </div>}
    </div>
  )
}

export default NavBar