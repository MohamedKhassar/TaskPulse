import { Pen, Star, Trash, User, UserPlus } from 'lucide-react'
import React from 'react'
import { AnimatedTooltip } from './animated-tooltip'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Task = {
    _id: string,
    column: string,
    user: string,
    taskName: string,
    description: string,
    deadline: string,
    priority: string,
    status: string,
    created_at: string
    assignedTo: string,
    starred: boolean
}

const Cards = ({ task }: { task: Task }) => {
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
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task._id,
        data: {
            type: 'item',
        },
    });

    return (
        <div className={`${task.status == "ToDo" ? "border-l-[#23B7E5]/40" : task.status == "Doing" ? "border-l-[#845ADF]/40" : "border-l-[#26BF94]/40"} flex justify-between p-2 w-[300px] bg-[#1A1C1E] h-fit border-l-[7px] rounded-lg ${isDragging && 'opacity-75'}`} ref={setNodeRef}
            {...attributes}
            style={{
                transition,
                transform: CSS.Translate.toString(transform),
            }}>
            <div className='flex flex-col gap-y-5'>
                <div className='flex gap-x-2 items-center'>
                    <Star className={`${task.starred ? "fill-yellow-500" : "fill-white/50"} border-none`} strokeWidth={0.2} size={13} />
                    <h1 className='font-semibold text-xs font-Poppins text-white/70'  {...listeners}>{task.taskName}</h1>
                </div>
                <div>
                    <ul className='flex flex-col gap-y-3 font-normal text-xs font-Poppins text-white/70'>
                        <li>Assigned On : <span className='text-[12px] text-white/50'>{task.created_at}</span></li>
                        <li>Target Date : <span className='text-[12px] text-white/50'>{task.deadline}</span></li>
                        <li className='flex items-center gap-x-1'>Assigned To :
                            {people.length ?
                                <AnimatedTooltip items={people.slice(1, 3)} /> : <UserPlus size={23} color='black' className='hover:bg-white/30 duration-300 cursor-pointer bg-white/50 rounded-full p-1' />
                            }
                        </li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-col justify-between'>
                <div className='flex gap-x-2'>
                    <button className='bg-[#845ADF]/10 hover:bg-[#845ADF]/40 duration-300 rounded-lg p-2'><Pen className='size-3' color='#845ADF' /></button>
                    <button className='bg-[#E6533C]/10 hover:bg-[#E6533C]/40 duration-300 rounded-lg p-2'><Trash className='size-3' color='#E6533C' /></button>
                </div>
                <div className='flex justify-end'>

                    <h1 className={`${task.priority == "medium" ? "bg-[#F5B849]/10 hover:bg-[#F5B849]/40 text-[#F5B849]" : task.priority.toLowerCase() == "high" ? "bg-[#E6533C]/10 hover:bg-[#E6533C]/40 text-[#E6533C]" : "bg-[#26BF94]/10 hover:bg-[#26BF94]/40 text-[#26BF94]"}  w-fit py-1 px-2 text-center font-semibold rounded-[4px] text-[11px] duration-300 capitalize`}>{task.priority}</h1>
                </div>
            </div>
        </div>
    )
}

export default Cards
