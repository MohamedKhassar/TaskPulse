"use client"
import Board from '@/components/ui/Board'
import Cards from '@/components/ui/Cards'
import { data } from '@/db/data'
import { cn } from '@/lib/utils'
import { Project, TaskPriority, TaskStatus } from '@/types/SchemasTypes'
import { DndContext, DragEndEvent, DragMoveEvent, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import axios from 'axios'
import { LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function page({ params }: { params: { projectId: string } }) {
  const [activeId, setActiveId] = useState<UniqueIdentifier>()
  const [project, setProject] = useState<Project>()

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
    const res = await axios.get(`http://localhost:3000/api/projects/${params.projectId}`)
    const data = res.data
    setProject(data)
  }
  useEffect(() => {
    fetchProject()
  }, [])
  return (
    <div className='flex flex-col justify-center items-center h-[90vh]'>
      <div className='h-1/6'>
        <h1 className='text-6xl font-body font-bold text-[#7A54CC]'>{project?.title}</h1>
      </div>
      <div className='lg:flex lg:flex-row flex-col lg:gap-x-5 gap-y-5 justify-center items-start'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handelDragStart}
          onDragMove={handelDragMove}
          onDragEnd={handelDragEnd}
        >
          <SortableContext
            items={[0, 1, 2]}
          >
            <Board projectId={params.projectId} column={TaskStatus.ToDo}>
              {project?.tasks?.filter(task => task.status == TaskStatus.ToDo).map(task => (
                <SortableContext
                  items={project?.tasks?.filter(task => task.status == TaskStatus.ToDo).map(task => task._id) as (UniqueIdentifier | { id: UniqueIdentifier })[]}
                >
                  <Cards projectId={project._id} key={task._id} task={task} />
                </SortableContext>
              ))}
            </Board>
            <Board projectId={params.projectId} column={TaskStatus.Doing}>
              {project?.tasks?.filter(task => task.status == TaskStatus.Doing).map(task => (
                <SortableContext
                  items={project?.tasks?.filter(task => task.status == TaskStatus.ToDo).map(task => task._id) as (UniqueIdentifier | { id: UniqueIdentifier })[]}
                >
                  <Cards projectId={project._id} key={task._id} task={task} />
                </SortableContext>
              ))}

            </Board>
            <Board projectId={params.projectId} column={TaskStatus.Done}>
              {project?.tasks?.filter(task => task.status == TaskStatus.Done).map(task => (
                <SortableContext
                  items={project?.tasks?.filter(task => task.status == TaskStatus.ToDo).map(task => task._id) as (UniqueIdentifier | { id: UniqueIdentifier })[]}
                >
                  <Cards projectId={project._id} key={task._id} task={task} />
                </SortableContext>
              ))}

            </Board>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
