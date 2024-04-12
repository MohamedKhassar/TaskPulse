import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className='w-full flex items-center justify-center py-5 px-14 bg-[#1A1C1E] text-[#EEEEEE] mt-8'>
            <h1 className='font-body'><span className='text-[#FFFFFF]/50'>Copyright © 2024</span> TaskPulse. <span className='text-[#FFFFFF]/50'>by <Link href={"https://github.com/mohamedkhassar"} className='text-[#7A54CC] underline'>Mohamed Khassar</Link> All rights reserved</span></h1>
        </div>
    )
}

export default Footer
