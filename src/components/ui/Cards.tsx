import { Pen, Star, Trash, User } from 'lucide-react'
import React from 'react'
import { AnimatedTooltip } from './animated-tooltip'

const Cards = () => {
    const task = {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        completed: false,
        created_at: "",
        updated_at: "2021-01-01 00:00:00"
    }
    const people = [
        {
            id: 1,
            name: "John Doe",
            designation: "Software Engineer",
            image:
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        },
        {
            id: 2,
            name: "Robert Johnson",
            designation: "Product Manager",
            image:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 3,
            name: "Jane Smith",
            designation: "Data Scientist",
            image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 4,
            name: "Emily Davis",
            designation: "UX Designer",
            image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 5,
            name: "Tyler Durden",
            designation: "Soap Developer",
            image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        },
        {
            id: 6,
            name: "Dora",
            designation: "The Explorer",
            image:
                "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
        },
    ];
    return (
        <div className='flex justify-between p-5 w-[416px] bg-[#1A1C1E] border-l-[#23B7E5]/40 h-[200px] border-l-[7px] rounded-lg'>
            <div className='flex flex-col gap-y-6'>
                <div className='flex gap-x-2 items-center'>
                    <Star className='fill-white/50 border-none' strokeWidth={0.2} size={15} />
                    <h1 className='font-semibold text-[13px] font-Poppins text-white/70'>New Project Blueprint</h1>
                </div>
                <div>
                    <ul className='flex flex-col gap-y-6 font-normal text-[13px] font-Poppins text-white/70'>
                        <li>Assigned On : <span className='text-[12px] text-white/50'>13,Nov 2022</span></li>
                        <li>Target Date : <span className='text-[12px] text-white/50'>20,Nov 2022</span></li>
                        <li className='flex items-center gap-x-1'>Assigned To :

                            {/* <div className='flex items-center'>
                                <User className='-translate-x-0 w-[28px] h-[28px] bg-white/50 rounded-full p-1 hover:-translate-y-[2px] duration-500' />
                                <User className='-translate-x-1 hover:-translate-y-[2px] duration-500 w-[28px] h-[28px] bg-white rounded-full p-1' />
                                <User className='-translate-x-2 hover:-translate-y-[2px] duration-500 w-[28px] h-[28px] bg-black rounded-full p-1' />
                            </div> */}
                            <AnimatedTooltip items={people.slice(1, 3)} />
                        </li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-col justify-between'>
                <div className='flex gap-x-2'>
                    <button className='bg-[#845ADF]/10 hover:bg-[#845ADF]/40 duration-300 rounded-lg p-2'><Pen size={16} color='#845ADF' /></button>
                    <button className='bg-[#E6533C]/10 hover:bg-[#E6533C]/40 duration-300 rounded-lg p-2'><Trash size={16} color='#E6533C' /></button>
                </div>
                <div className='flex justify-end'>

                    <h1 className='bg-[#F5B849]/10 hover:bg-[#F5B849]/40 duration-300 text-[#F5B849] w-[36.25px] p-1 text-center font-semibold rounded-[4px] text-[9.8px]'>High</h1>
                </div>
            </div>
        </div>
    )
}

export default Cards
