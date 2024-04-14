"use client"
import Board from '@/components/ui/Board'
import Cards from '@/components/ui/Cards'
import { fetchProjectById } from '@/store/project/projectThunk'
import { AppDispatch, RootState } from '@/store/store'
import { Project, TaskStatus } from '@/types/SchemasTypes'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export default function page({ params }: { params: { projectId: string } }) {
  const dispatch = useDispatch<AppDispatch>()
  const projects = useSelector((state: RootState) => state.projectSlice.projects) as Project

  const fetchProject = async () => {
    await dispatch(fetchProjectById(params.projectId))
  }
  useEffect(() => {
    fetchProject()
  }, [params.projectId, dispatch, fetchProjectById])
  return (
    <div className='flex flex-col justify-center items-center h-screen lg:gap-y-5 gap-y-10 lg:h-[90vh]'>
      <div className='h-1/6 lg:mt-2 mt-8'>
        <h1 className='text-6xl font-body font-bold text-[#7A54CC]'>{projects?.title}</h1>
      </div>
      <div className="flex lg:flex-row lg:gap-x-36 flex-col gap-y-8">
        <Board key={TaskStatus.ToDo} projectId={params.projectId} column={TaskStatus.ToDo}>
          {projects?.tasks?.filter(task => task.status == TaskStatus.ToDo).map(task => (

            <Cards projectId={projects._id} key={task._id} task={task} />

          ))}
        </Board>
        <Board key={TaskStatus.Doing} projectId={params.projectId} column={TaskStatus.Doing}>
          {projects?.tasks?.filter(task => task.status == TaskStatus.Doing).map(task => (

            <Cards projectId={projects._id} key={task._id} task={task} />

          ))}

        </Board>
        <Board key={TaskStatus.Done} projectId={params.projectId} column={TaskStatus.Done}>
          {projects?.tasks?.filter(task => task.status == TaskStatus.Done).map(task => (

            <Cards projectId={projects._id} key={task._id} task={task} />
          ))}

        </Board>
      </div>
    </div>
  )
}
