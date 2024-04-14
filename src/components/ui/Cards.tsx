import { Pen, Star, Trash, User, UserPlus } from 'lucide-react'
import React, { FormEvent, useEffect, useState } from 'react'
import { AnimatedTooltip } from './animated-tooltip'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task, TaskPriority, TaskStatus } from '@/types/SchemasTypes'
import ModalConfirm from '../DeleteAlert'
import axios from 'axios'
import { UpdateConfirm } from '../UpdateAlert'
import { cn } from '@/lib/utils'
import FormTask from '../FormTask'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { deleteTaskById, getTaskById, updateTask } from '@/store/task/taskThunk'
import { fetchProjectById } from '@/store/project/projectThunk'
import { toast } from 'react-toastify'



const Cards = ({ task, projectId }: { task: Task, projectId: string }) => {
    const [isClose, setIsClose] = useState({
        delete: false,
        update: false,
        formUpdate: false
    })
    const dispatch = useDispatch<AppDispatch>()

    const [showPriority, setShowPriority] = useState(false)
    const [searchMembers, setSearchMembers] = useState(false)
    const [taskUpdate, setTaskUpdate] = useState(task)

    const confirmDelete = async () => {
        try {
            await dispatch(deleteTaskById(task._id)).then(async () => {
                await dispatch(fetchProjectById(projectId)).then(() => setIsClose({ ...isClose, delete: false })).then(() => setTaskUpdate(task))
            })
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

    const handelUpdate = async (e: FormEvent) => {
        try {

            e.preventDefault()
            await dispatch(updateTask({ taskId: task._id, taskUpdate })).then(async () => {
                await dispatch(fetchProjectById(projectId)).then(() => setIsClose({ ...isClose, update: false }))
            })
            toast.success("updated successfully")
        } catch (error) {
            console.log(error)
        }
    }
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
                        <li>Assigned On : <span className='text-[12px] text-white/50'>{new Date(task.created_at).toLocaleDateString()}</span></li>
                        <li>Target Date : <span className='text-[12px] text-white/50'>{new Date(task.deadline).toLocaleDateString()}</span></li>
                        <li className='relative flex items-center gap-x-1'>
                            Assigned To :
                            <div className='flex gap-x-1 items-center' onClick={() => setSearchMembers(!searchMembers)}>

                                {task.assignedTo && <AnimatedTooltip items={task.assignedTo} />}

                                <UserPlus size={23} color='black' className='hover:bg-white/30 duration-300 cursor-pointer bg-white/50 rounded-full p-1' />
                            </div>
                            {searchMembers && <div className="text-black absolute top-7 z-10 bg-slate-800 p-3 rounded-md">
                                <input type="text" className='rounded p-2 outline-none' autoFocus name="" id="" />
                            </div>
                            }
                        </li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-col justify-between'>
                <div className='flex gap-x-2'>
                    <button className='bg-[#845ADF]/10 hover:bg-[#845ADF]/40 duration-300 rounded-lg p-2' onClick={() => setIsClose({ ...isClose, formUpdate: true })}><Pen className='size-3' color='#845ADF' /></button>
                    <button
                        data-testid="delete-button" className='bg-[#E6533C]/10 hover:bg-[#E6533C]/40 duration-300 rounded-lg p-2' onClick={() => setIsClose({ ...isClose, delete: true })}><Trash className='size-3' color='#E6533C' /></button>
                </div>
                <div className='flex justify-end relative' onClick={() => setShowPriority(!showPriority)}>
                    <h1 className={`${task.priority == TaskPriority.Medium ? "bg-[#F5B849]/10 hover:bg-[#F5B849]/40 text-[#F5B849]" : task.priority == TaskPriority.High ? "bg-[#E6533C]/10 hover:bg-[#E6533C]/40 text-[#E6533C]" : "bg-[#26BF94]/10 hover:bg-[#26BF94]/40 text-[#26BF94]"}  w-fit py-1 px-2 text-center font-semibold rounded-[4px] text-[11px] duration-300 capitalize`}>{task.priority}</h1>
                    {showPriority &&
                        <div className='flex gap-x-5 absolute top-7 bg-slate-800 rounded-md p-3 z-10'>
                            <button className={cn("bg-[#E6533C]/10 hover:bg-[#E6533C]/40 text-[#E6533C]  w-fit py-1 px-2 text-center font-semibold rounded-[4px] text-[11px] duration-300 capitalize",
                                TaskPriority.High === task.priority && "hidden"
                            )} onClick={() => { setIsClose({ ...isClose, update: true }); setTaskUpdate({ ...taskUpdate, priority: TaskPriority.High }) }}>{TaskPriority.High}</button>
                            <button className={cn("bg-[#F5B849]/10 hover:bg-[#F5B849]/40 text-[#F5B849] w-fit py-1 px-2 text-center font-semibold rounded-[4px] text-[11px] duration-300 capitalize",
                                TaskPriority.Medium === task.priority && "hidden"
                            )} onClick={() => { setIsClose({ ...isClose, update: true }); setTaskUpdate({ ...taskUpdate, priority: TaskPriority.Medium }) }}>{TaskPriority.Medium}</button>
                            <button className={cn("bg-[#26BF94]/10 hover:bg-[#26BF94]/40 text-[#26BF94]  w-fit py-1 px-2 text-center font-semibold rounded-[4px] text-[11px] duration-300 capitalize",
                                TaskPriority.Low === task.priority && "hidden"
                            )} onClick={() => { setIsClose({ ...isClose, update: true }); setTaskUpdate({ ...taskUpdate, priority: TaskPriority.Low }) }}>{TaskPriority.Low}</button>

                        </div>}
                </div>
            </div>
            {isClose.delete && <ModalConfirm onClose={() => setIsClose({ ...isClose, delete: false })} onDelete={confirmDelete} />}
            {isClose.update && <UpdateConfirm onClose={() => { setIsClose({ ...isClose, update: false }); setTaskUpdate({ ...taskUpdate, priority: task.priority }) }} onUpdate={handelUpdate} />}
            {isClose.formUpdate && <FormTask projectId={projectId} onClose={() => setIsClose({ ...isClose, formUpdate: false })} task={task} />}
        </div >
    )
}

export default Cards
