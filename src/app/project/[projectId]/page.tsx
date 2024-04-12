"use client"
import Board from '@/components/ui/Board'
import Cards from '@/components/ui/Cards'
import { data } from '@/db/data'
import { cn } from '@/lib/utils'
import { fetchProjectById } from '@/store/project/projectThunk'
import { AppDispatch, RootState } from '@/store/store'
import { InitialProject } from '@/types/ReduxType'
import { Project, TaskPriority, TaskStatus } from '@/types/SchemasTypes'
import { DndContext, DragEndEvent, DragMoveEvent, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import axios from 'axios'
import { LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export default function page({ params }: { params: { projectId: string } }) {
  const [activeId, setActiveId] = useState<UniqueIdentifier>()
  const dispatch = useDispatch<AppDispatch>()
  const projects = useSelector((state: RootState) => state.projectSlice.projects) as Project
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handelDragStart = (e: DragStartEvent) => {
    const { active } = e
    const { id } = active
    setActiveId(id)
  }

  const handelDragMove = (e: DragMoveEvent) => {
    const { active, over } = e
    if (active.id.toString().includes("item") &&
      over?.id.toString().includes("items") &&
      active &&
      over &&
      active.id !== over.id
    ) {

    }
  }

  const handelDragEnd = (e: DragEndEvent) => {

  }
  const fetchProject = async () => {
    await dispatch(fetchProjectById(params.projectId))
  }
  useEffect(() => {
    fetchProject()
  }, [])
  return (
    <div className='flex flex-col justify-center items-center h-screen lg:gap-y-5 gap-y-10 lg:h-[90vh]'>
      <div className='h-1/6 lg:mt-2 mt-8'>
        <h1 className='text-6xl font-body font-bold text-[#7A54CC]'>{projects?.title}</h1>
      </div>
      <div className="flex lg:flex-row lg:gap-x-36 flex-col gap-y-8">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handelDragStart}
          onDragMove={handelDragMove}
          onDragEnd={handelDragEnd}
        >
          <Board projectId={params.projectId} column={TaskStatus.ToDo}>
            {projects?.tasks?.filter(task => task.status == TaskStatus.ToDo).map(task => (
              <SortableContext
                items={projects?.tasks?.filter(task => task.status == TaskStatus.ToDo).map(task => task._id) as (UniqueIdentifier | { id: UniqueIdentifier })[]}
              >
                <Cards projectId={projects._id} key={task._id} task={task} />
              </SortableContext>
            ))}
          </Board>
          <Board projectId={params.projectId} column={TaskStatus.Doing}>
            {projects?.tasks?.filter(task => task.status == TaskStatus.Doing).map(task => (
              <SortableContext
                items={projects?.tasks?.filter(task => task.status == TaskStatus.ToDo).map(task => task._id) as (UniqueIdentifier | { id: UniqueIdentifier })[]}
              >
                <Cards projectId={projects._id} key={task._id} task={task} />
              </SortableContext>
            ))}

          </Board>
          <Board projectId={params.projectId} column={TaskStatus.Done}>
            {projects?.tasks?.filter(task => task.status == TaskStatus.Done).map(task => (
              <SortableContext
                items={projects?.tasks?.filter(task => task.status == TaskStatus.ToDo).map(task => task._id) as (UniqueIdentifier | { id: UniqueIdentifier })[]}
              >
                <Cards projectId={projects._id} key={task._id} task={task} />
              </SortableContext>
            ))}

          </Board>
        </DndContext>
      </div>
    </div>
  )
}
