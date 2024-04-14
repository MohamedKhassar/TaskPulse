import { createProject, fetchAllProjects, fetchProjectById, updateProjectById } from '@/store/project/projectThunk';
import { AppDispatch, RootState } from '@/store/store';
import { InitialProject } from '@/types/ReduxType';
import { Project } from '@/types/SchemasTypes';
import React, { FormEvent, MouseEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Update = ({ projectId, onClose }: { projectId: string, onClose: (arg?: any) => void }) => {

    const { projects } = useSelector((state: RootState) => state.projectSlice)
    const filteredProject = projects?.find((project: Project) => project._id === projectId)
    const [projectData, setProjectData] = useState<Project>(filteredProject);
    const [member, setMember] = useState("")
    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            await dispatch(updateProjectById({ _id: projectData._id, members: projectData.members, title: projectData.title })).then(async () => {
                await dispatch(fetchAllProjects()).then(() => onClose())
            })
            toast.success("project data updated successfully")
        } catch (error) {

        }
    };

    return (
        <div>
            <div className="font-body fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
                <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-lg p-8">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-[#7A54CC]">Update Project</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={projectData.title}
                                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                                placeholder="Enter Project title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="Members" className="block text-gray-700 font-bold mb-2">Members</label>
                            <div className='flex items-center'>
                                <input
                                    type="text"
                                    id="Members"
                                    value={member}
                                    onChange={(e) => setMember(e.target.value)}
                                    placeholder="Enter name of the member"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 relative"
                                />
                                {/* {member.length ? <PlusSquare onClick={() => setProjectData({ ...projectData, members })} className='absolute right-10' /> : null} */}
                            </div>
                            <div className='flex gap-x-4 my-4'>
                                {projectData.members?.length ? projectData.members?.map(member => (
                                    <div>
                                        {member.name}
                                    </div>
                                )) : <h1 className='font-body'>No Members Added Yet</h1>}
                            </div>
                        </div>
                        <div className='grid grid-cols-2 place-items-center'>

                            <button
                                className="text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 capitalize"
                            >
                                Update project
                            </button>
                            <button
                                className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                                type='button'
                                onClick={onClose}
                            >
                                No, cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;
