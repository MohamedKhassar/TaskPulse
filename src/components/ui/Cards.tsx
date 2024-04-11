import { Pen, Star, Trash, User, UserPlus } from 'lucide-react'
import React, { useState } from 'react'
import { AnimatedTooltip } from './animated-tooltip'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task, TaskPriority, TaskStatus } from '@/types/SchemasTypes'
import ModalConfirm from '../DeleteAlert'
import axios from 'axios'



const Cards = ({ task, projectId }: { task: Task, projectId: string }) => {
    const [isClose, setIsClose] = useState(false)
    const confirmDelete = async () => {
        try {
            setIsClose(false)
            await axios.delete(`http://localhost:3000/api/projects/${projectId}/task/${task._id}`)
        } catch (error) {
            console.log(error)
        }
    }
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
        <div className={`${task.status == TaskStatus.ToDo ? "border-l-[#23B7E5]/40" : task.status == TaskStatus.Doing ? "border-l-[#845ADF]/40" : "border-l-[#26BF94]/40"} flex justify-between p-2 w-full bg-[#1A1C1E] h-fit border-l-[7px] rounded-lg ${isDragging && 'opacity-75'}`} ref={setNodeRef}
            {...attributes}
            style={{
                transition,
                transform: CSS.Translate.toString(transform),
            }}>
            <div className='flex flex-col gap-y-5'>
                <div className='flex gap-x-2 items-center'>
                    <Star className="fill-white/50 border-none" strokeWidth={0.2} size={13} />
                    <h1 className='font-semibold text-xs font-Poppins text-white/70'  {...listeners}>{task.taskName}</h1>
                </div>
                <div>
                    <ul className='flex flex-col gap-y-3 font-normal text-xs font-Poppins text-white/70'>
                        <li>Assigned On : <span className='text-[12px] text-white/50'>{new Date(task.created_at).getDate()}</span></li>
                        <li>Target Date : <span className='text-[12px] text-white/50'>{new Date(task.deadline).getDate()}</span></li>
                        <li className='flex items-center gap-x-1'>Assigned To :
                            {task.assignedTo.length ?
                                <AnimatedTooltip items={task.assignedTo} /> : <UserPlus size={23} color='black' className='hover:bg-white/30 duration-300 cursor-pointer bg-white/50 rounded-full p-1' />
                            }
                        </li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-col justify-between'>
                <div className='flex gap-x-2'>
                    <button className='bg-[#845ADF]/10 hover:bg-[#845ADF]/40 duration-300 rounded-lg p-2'><Pen className='size-3' color='#845ADF' /></button>
                    <button className='bg-[#E6533C]/10 hover:bg-[#E6533C]/40 duration-300 rounded-lg p-2' onClick={() => setIsClose(true)}><Trash className='size-3' color='#E6533C' /></button>
                </div>
                <div className='flex justify-end'>

                    <h1 className={`${task.priority == TaskPriority.Medium ? "bg-[#F5B849]/10 hover:bg-[#F5B849]/40 text-[#F5B849]" : task.priority == TaskPriority.High ? "bg-[#E6533C]/10 hover:bg-[#E6533C]/40 text-[#E6533C]" : "bg-[#26BF94]/10 hover:bg-[#26BF94]/40 text-[#26BF94]"}  w-fit py-1 px-2 text-center font-semibold rounded-[4px] text-[11px] duration-300 capitalize`}>{task.priority}</h1>
                </div>
            </div>
            {isClose && < ModalConfirm onClose={() => setIsClose(false)} onDelete={confirmDelete} />}
        </div>
    )
}

export default Cards
