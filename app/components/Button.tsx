import React from 'react'
import Image from 'next/image'
export interface ButtonProps{
    type:'button'| 'submit',
    title:string,
    icon?:string,
    variant:'btn_black'
}
function Button({type, title, icon, variant}: ButtonProps) {
  return (
    <button type={type} className={`rounded-2xl px-4 mt-2 w-28 ${variant}`}> 
    {icon&& <Image src={icon} width={24} height={24} alt='logo'></Image>}
    {title}
    </button>
  )
}

export default Button