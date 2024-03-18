"use client"
import Image from 'next/image'
import React, { use } from 'react'
import logo from "../../public/images/logo.png"
import { BellRing, User } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const NavBar = () => {
    const user = {
        id: 1,
        name: 'Mohamed Khassar',
        image: ""
    }
    const notification: [] = [
    ]
    return (
        <div className='flex items-center justify-between py-1 px-14 bg-[#1A1C1E] text-[#EEEEEE] '>
            <div className='flex gap-x-4 items-center'>
                <Image src={logo} alt="" className='w-14' />
                <h1 className='text-2xl font-body'><span className='font-bold text-2xl  text-[#7A54CC]'>Task</span>Pulse</h1>
            </div>
            <div className='flex items-center gap-x-11'>
                {/* ------------------------when user login---------------------------------------- */}
                <DropdownMenu>
                    <DropdownMenuTrigger className='outline-none'><BellRing className='hover:bg-gray-500 p-2 rounded-full rotate-45 duration-200' size={35} /></DropdownMenuTrigger>
                    <DropdownMenuContent className='w-96 -translate-x-28 bg-[#191C2E] text-white border-gray-500'>
                        {notification.length < 1 ? <DropdownMenuItem className='hover:bg-none capitalize'>There is no notification</DropdownMenuItem> :
                            notification.map(n =>
                                <DropdownMenuItem>{n}</DropdownMenuItem>

                            )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className='outline-none'><div className='bg-gray-500 rounded-full p-2 cursor-pointer border-2 hover:border-[2.5px] hover:border-slate-400 duration-300'>
                        {!user.image ? <User color='white' /> : user.image}
                    </div></DropdownMenuTrigger>
                    <DropdownMenuContent className='w-56 bg-[#191C2E] text-white border-gray-500'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Projects</DropdownMenuItem>
                        <DropdownMenuItem className='bg-red-600 text-red-950 capitalize hover:bg-slate-900'>logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* ------------------------when user not login---------------------------------------- */}
                {/* <button className='border border-white p-1 rounded-lg w-24 duration-300 hover:bg-white hover:text-[#31363F]'>Sign In</button> */}

            </div>
        </div >
    )
}

export default NavBar
