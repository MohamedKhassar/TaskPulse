import { fetchProjectById } from '@/store/project/projectThunk';
import { AppDispatch } from '@/store/store';
import { updateTask } from '@/store/task/taskThunk';
import { Task, TaskPriority, TaskStatus } from '@/types/SchemasTypes';
import axios from 'axios';
import { CircleX } from 'lucide-react';
import React, { ChangeEvent, FormEvent, FormEventHandler, MouseEventHandler } from 'react'


import { useState } from 'react';
import { useDispatch } from 'react-redux';

const FormTask = ({ onClose, task, projectId }: { onClose: MouseEventHandler, task: Task, projectId: string }) => {
    const [taskData, setTaskData] = useState(task);
    const dispatch = useDispatch<AppDispatch>()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTaskData((prevTaskData) => ({
            ...prevTaskData,
            [name]: value,
        }));
    };

    const handelUpdate = async (e: FormEvent) => {
        try {
            e.preventDefault()
            await dispatch(updateTask({ taskId: task._id, taskUpdate: taskData })).then(async () => {
                await dispatch(fetchProjectById(projectId))
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="fixed inset-0 overflow-y-auto z-40 backdrop-blur-md bg-black/10">
            <div className="flex items-center justify-center h-full">
                <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
                    <div className="flex justify-end p-2 items-center">
                        <h1 className="text-xl font-semibold mb-4">Create Task</h1>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        >
                            <CircleX color='darkred' />
                        </button>
                    </div>
                    <form onSubmit={handelUpdate}>
                        <div className="mb-4">
                            <label htmlFor="taskName" className="block mb-1">Task Name</label>
                            <input type="text" id="taskName" name="taskName" value={taskData.taskName} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block mb-1">Description</label>
                            <textarea id="description" name="description" value={taskData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="priority" className="block mb-1">Priority</label>
                            <select id="priority" name="priority" value={taskData.priority} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
                                <option value={TaskPriority.Low}>{TaskPriority.Low}</option>
                                <option value={TaskPriority.Medium}>{TaskPriority.Medium}</option>
                                <option value={TaskPriority.High}>{TaskPriority.High}</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status" className="block mb-1">Status</label>
                            <select id="status" name="status" value={taskData.status} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
                                <option value={TaskStatus.ToDo}>{TaskStatus.ToDo}</option>
                                <option value={TaskStatus.Doing}>{TaskStatus.Doing}</option>
                                <option value={TaskStatus.Done}>{TaskStatus.Done}</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="deadline" className="block mb-1">Deadline</label>
                            <input type="date" id="deadline" name="deadline" value={new Date(taskData.deadline).toISOString().split('T')[0]} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default FormTask
