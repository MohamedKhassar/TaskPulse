"use client"
import { cn } from '@/lib/utils'
import { createTaskInProject, fetchProjectById } from '@/store/project/projectThunk'
import { AppDispatch } from '@/store/store'
import { TaskStatus } from '@/types/SchemasTypes'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import axios from 'axios'
import React, { FormEvent, ReactNode, useState } from 'react'
import { useDispatch } from 'react-redux'

const Board = ({ children, column, projectId }: { children: ReactNode, column: TaskStatus, projectId: string }) => {
    const [taskData, setTaskData] = useState({
        taskName: "",
        status: TaskStatus.ToDo
    })
    const dispatch = useDispatch<AppDispatch>()

    const handleAddTask = async (e: FormEvent) => {
        try {
            e.preventDefault()
            if (taskData.taskName) {
                await dispatch(createTaskInProject({ projectId, taskName: taskData.taskName, status: taskData.status })).then(async () => {

                    await dispatch(fetchProjectById(projectId))
                }).then(() => {
                    setTaskData({
                        taskName: "",
                        status: TaskStatus.ToDo
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={cn(column == TaskStatus.ToDo ? "border-t-[#23B7E5]/40" : column == TaskStatus.Doing ? "border-t-[#845ADF]/40" : "border-t-[#26BF94]/40"
            ,
            "rounded-lg p-3 bg-[#000000]/70 flex flex-col gap-y-5 border-t-[7px] capitalize")}
        >
            <h1 className='text-white text-lg w-fit'>{column}</h1>
            <div className='overflow-y-scroll flex flex-col gap-y-5 h-fit max-h-80 min-h-fit lg:min-w-64 min-w-56 scroll p-3'>
                {children}
                <form action="" className='my-2 flex flex-col gap-y-3 items-end' onSubmit={handleAddTask}>

                    <div className="relative bg-inherit">
                        <input value={taskData.taskName} onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value, status: column })} type="text" id={column} name="username" className="peer bg-transparent h-10 w-full rounded-lg text-gray-200 placeholder-transparent ring-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me" /><label htmlFor={column} className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Type inside me</label>
                    </div>

                    <div className='flex justify-center items-center'>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white transition-all duration-200 ease-in-out bg-[#7A54CC] border border-transparent rounded-md shadow-sm hover:bg-[#6a3fc5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Board
