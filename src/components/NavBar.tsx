"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import logo from "../../public/images/logo.png"
import { BellRing, LoaderCircle, User } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'


const NavBar = () => {
    const { data: user } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const authRoutes = ["/login", "/register"]
    const notification: [] = [
    ]
    const [loading, setLoading] = useState(false)

    return (
        <div className={cn('flex items-center justify-between py-1 px-14 bg-[#1A1C1E] text-[#EEEEEE]',
            authRoutes.includes(pathname) && 'hidden'
        )}>
            <div className='flex gap-x-4 items-center'>
                <Image src={logo} alt="" className='w-14' />
                <h1 className='text-2xl font-body'><span className='font-bold text-2xl  text-[#7A54CC]'>Task</span>Pulse</h1>
            </div>
            {user ?
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
                            <User color='white' />
                        </div></DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56 bg-[#191C2E] text-white border-gray-500'>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Projects</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setLoading(true); signOut() }} className='bg-red-600 text-red-950 capitalize hover:bg-slate-900 cursor-pointer'>logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                :
                <div className='flex gap-x-5 items-center'>
                    {/* ------------------------when user not login---------------------------------------- */}
                    <button onClick={() => router.push("/login")} className='capitalize hover:text-[#1f0c47] border border-[#6842bc] p-1 rounded-lg w-20 duration-300 hover:bg-[#7A54CC] text-[#a27cf5]'>Sign In</button>
                    <button onClick={() => router.push("/register")} className='capitalize text-[#1f0c47] border border-[#6842bc] p-1 rounded-lg w-20 duration-300 hover:bg-transparent bg-[#7A54CC] hover:text-[#a27cf5]'>register</button>
                </div>
            }
        </div >
    )
}

export default NavBar
