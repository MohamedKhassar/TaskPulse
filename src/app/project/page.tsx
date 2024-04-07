"use client"
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import project from "../../../public/images/project.png"
import { Pen, Trash2 } from 'lucide-react'
import ModalConfirm from '@/components/DeleteAlert'
import Form from '@/components/FormProject'
import axios from 'axios'
import { Project, TaskStatus } from '@/types/SchemasTypes'
import { useSession } from 'next-auth/react'
function page() {
    const [isClose, setIsClose] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])
    const handelAlert = () => {
        setIsClose(!isClose)
    }

    const confirmDelete = () => {

    }

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/projects");
            res.data && (setProjects(res.data)

            )
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='p-10'>
            <div className='flex items-center gap-x-5'>
                <h1 className='font-body text-4xl capitalize text-[#7A54CC]'>my projects</h1>
                <Image className='size-12' src={project} alt='' />
            </div>
            <div className="flex items-center justify-center h-[70vh]">
                <div className="w-full">
                    <div className="overflow-auto lg:overflow-visible ">
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
                                {projects ? projects.map(project => (

                                    <tr key={project._id} className="bg-gray-800">
                                        <td className="p-3">
                                            {project.title}
                                        </td>
                                        <td className="p-3 font-bold capitalize">
                                            mohamed khassar
                                        </td>
                                        <td className="p-3">
                                            <div className="relative p-4 max-w-sm mx-auto">
                                                <div className="flex mb-2 items-center justify-between">
                                                    <div>
                                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                                                            In Progress
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs font-semibold inline-block text-teal-600">
                                                            {project.tasks && parseInt(project.tasks.filter(task => task.status == TaskStatus.Done).length / Number(project.tasks.length) * 100)}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex rounded-full h-2 bg-gray-200">
                                                    <div className="w-[70%] rounded-full bg-teal-500"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className='flex gap-x-6 items-center justify-center'>
                                                <button className="inline-flex items-center px-4 py-2 bg-yellow-600/70 hover:bg-yellow-700/70 text-white text-sm font-medium rounded-md">
                                                    <Pen size={15} className='text-yellow-400' />
                                                </button>
                                                <button className="inline-flex items-center px-4 py-2 bg-red-600/70 hover:bg-red-700/70 text-white text-sm font-medium rounded-md" onClick={handelAlert}>
                                                    <Trash2 size={15} className='text-red-400' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                    : "not found"}</tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isClose && <ModalConfirm onClose={handelAlert} onDelete={confirmDelete} />}
        </div>
    )
}

export default page
