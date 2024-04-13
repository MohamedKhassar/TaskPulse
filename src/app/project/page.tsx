"use client"
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import project from "../../../public/images/project.png"
import { Pen, Trash2 } from 'lucide-react'
import ModalConfirm from '@/components/DeleteAlert'
import Form from '@/components/FormProject'
import { Project, Task, TaskStatus } from '@/types/SchemasTypes'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch } from 'react-redux'
import { deleteProjectById, fetchAllProjects } from '@/store/project/projectThunk'
import Update from '@/components/UpdateProject'
function page() {
    const [isClose, setIsClose] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [deletedId, setDeletedId] = useState<string>()
    const [updatedId, setUpdatedId] = useState<string>()
    const dispatch = useDispatch<AppDispatch>()
    const projects = useSelector((state: RootState) => state.projectSlice.projects) as Project[]

    const router = useRouter()
    const handelAlert = (id: string) => {
        setDeletedId(id)
        setIsClose(!isClose)
    }
    const handelUpdate = (id: string) => {
        setIsUpdate(!isUpdate)
    }


    const confirmDelete = async () => {
        try {
            if (deletedId) {
                await dispatch(deleteProjectById(deletedId)).then(() => setIsClose(false))
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = async () => {
        try {
            await dispatch(fetchAllProjects())
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [dispatch])
    function percentage(partialValue: Task[], totalValue: Task[]): number {
        // Check if either array is empty
        if (totalValue.length === 0 || partialValue.length === 0) {
            return 0; // or handle this case appropriately
        }

        // Calculate the percentage
        const percentage = Math.ceil((100 * partialValue.length) / totalValue.length);
        // Return the percentage
        return percentage;
    }


    return (
        <div className='p-10 flex flex-col gap-y-5 h-screen'>
            {/* <div className={cn("hidden items-center justify-center absolute w-full h-full backdrop-blur-xl bg-black/5 z-20", loading && "flex")}>
                <LoaderCircle size={50} className="animate-spin" color="#7A54CC" />
            </div> */}
            <div className='flex items-center gap-x-5'>
                <h1 className='font-body text-4xl capitalize text-[#7A54CC]'>my projects</h1>
                <Image className='size-12' src={project} alt='' />
            </div>
            <div className="flex items-center justify-center">
                <div className="w-full">
                    <div className="overflow-auto lg:overflow-visible flex flex-col gap-y-6">
                        <Form />
                        <table className="table text-[#7A54CC] border-separate space-y-6 text-md w-full text-center font-body">
                            <thead className="bg-gray-800 text-gray-500 text-center capitalize">
                                <tr>
                                    <th className="p-3">name</th>
                                    <th className="p-3">manager</th>
                                    <th className="p-3">completion</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(projects) ? projects.map(project => (
                                    <tr key={project._id} className="bg-gray-800 hover:underline">
                                        <td className="p-3 hover:underline cursor-pointer" onClick={() => router.push(`project/${project._id}`)}>
                                            {project.title}
                                        </td>
                                        <td className="p-3 font-bold capitalize cursor-pointer" onClick={() => router.push(`project/${project._id}`)}>
                                            {project?.userId?.name}
                                        </td>
                                        <td className="p-3">
                                            <div className="relative p-4 max-w-sm mx-auto">
                                                <div className="flex mb-2 items-center justify-between">
                                                    <div className="text-right">
                                                        <span className={cn(`w-[${project.tasks && percentage(project.tasks.filter(task => task.status === TaskStatus.Done), project.tasks)}%] rounded-full text-xs font-semibold inline-block`, {
                                                            'text-red-500': percentage(project.tasks!.filter(task => task.status === TaskStatus.Done), project.tasks!) >= 0 && percentage(project.tasks!.filter(task => task.status === TaskStatus.Done), project.tasks!) < 25,
                                                            'text-yellow-500': percentage(project.tasks!.filter(task => task.status === TaskStatus.Done), project.tasks!) >= 25 && percentage(project.tasks!.filter(task => task.status === TaskStatus.Done), project.tasks!) < 75,
                                                            'text-green-500': percentage(project.tasks!.filter(task => task.status === TaskStatus.Done), project.tasks!) >= 75 && percentage(project.tasks!.filter(task => task.status === TaskStatus.Done), project.tasks!) <= 100,
                                                        })}>
                                                            {project.tasks && percentage(project.tasks.filter(task => task.status == TaskStatus.Done), project.tasks)}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex rounded-full h-2 bg-gray-200">
                                                    <div className={cn(`w-[${project.tasks && percentage(project.tasks.filter(task => task.status === TaskStatus.Done), project.tasks)}%] rounded-full`, {
                                                        'bg-red-500': percentage(project.tasks!.filter(task => task.status === TaskStatus.Done), project.tasks!) >= 0 && percentage(project.tasks!.filter(task => task.status === TaskStatus.Done), project.tasks!) < 25,
                                                        'bg-yellow-500': percentage(project.tasks!.filter(task => task.status === TaskStatus.Done), project.tasks!) >= 25 && percentage(project.tasks!.filter(task => task.status === TaskStatus.Done), project.tasks!) < 75,
                                                        'bg-green-500': percentage(project.tasks!.filter(task => task.status === TaskStatus.Done), project.tasks!) >= 75 && percentage(project.tasks!.filter(task => task.status === TaskStatus.Done), project.tasks!) <= 100,
                                                    })}></div>

                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className='flex gap-x-6 items-center justify-center'>
                                                <button className="inline-flex items-center px-4 py-2 bg-yellow-600/70 hover:bg-yellow-700/70 text-white text-sm font-medium rounded-md" onClick={() => handelUpdate(project._id)}>
                                                    <Pen size={15} className='text-yellow-400' />
                                                </button>
                                                <button className="inline-flex items-center px-4 py-2 bg-red-600/70 hover:bg-red-700/70 text-white text-sm font-medium rounded-md" onClick={() => handelAlert(project._id)}>
                                                    <Trash2 size={15} className='text-red-400' />
                                                </button>
                                            </div>
                                        </td>
                                        {isUpdate && <Update project={project} onClose={() => handelUpdate("")} />}
                                    </tr>
                                ))
                                    : <tr className='col-span-4'><td className="p-3">not found</td></tr>}</tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isClose && <ModalConfirm onClose={() => handelAlert("")} onDelete={confirmDelete} />}
        </div >
    )
}

export default page
