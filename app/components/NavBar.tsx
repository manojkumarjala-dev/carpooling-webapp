import Link from "next/link"
import Image from "next/image"
import { NAV_LINKS } from "@/constants"
import Button from "./Button"
function NavBar() {
  return (
    <nav className="border pb-2 relative z-30 shadow-lg flex justify-around">
        <Link href='/'>
            <Image src='/logoname.svg' width='250' height='40' alt='logoname'></Image>
        </Link>
        <ul className="hidden h-fulll gap-12 sm:flex">
            {
                NAV_LINKS.map(heading => 
                    <Link href={heading.href} key={heading.key} className="flex text-gray-500 items-center pt-2 hover:text-gray-900 hover:underline hover:underline-offset-4 decoration-red-700">
                        {heading.label}
                    </Link>)
            }
        </ul>
        <div className="flex sm:hidden mt-2">

        <Image src='/menu.svg' width={28} height={28} alt="menu" ></Image>
        </div>
        <div className="hidden sm:flex">
        <Button title="Login" type="button" variant="btn_black" ></Button>
        </div>
    </nav>
  )
}

export default NavBar