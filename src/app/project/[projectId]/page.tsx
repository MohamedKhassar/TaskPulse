"use client"
import Board from '@/components/ui/Board'
import Cards from '@/components/ui/Cards'
import { data } from '@/db/data'
import { DndContext, DragEndEvent, DragMoveEvent, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import React, { useState } from 'react'

export default function page() {
    const { boards, tasks, columns } = data
    const [activeId, setActiveId] = useState<UniqueIdentifier>()
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
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex gap-8 justify-center items-start'>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handelDragStart}
                    onDragMove={handelDragMove}
                    onDragEnd={handelDragEnd}
                >
                    <SortableContext
                        items={boards.map(board => board._id)}
                    >
                        {boards.map((board, i) =>
                            <Board column={columns.find(column => column.board == board._id)} key={i} board={board}>
                                {columns.filter(column => column.board == board._id).map(column => (
                                    tasks.filter(task => task.status.toLowerCase() == column.columnName.toLowerCase()).map(task => (
                                        <SortableContext
                                            items={tasks.filter(task => task.column == column._id).map(task => task._id)}
                                        >
                                            <Cards key={task._id} task={task} />
                                        </SortableContext>
                                    ))
                                ))}
                            </Board>
                        )}
                    </SortableContext>
                    {/* <Board title='ToDo'>
             <SortableContext
               items={toDo.map(task => task._id)}
             >
               {toDo.map(task => (
                 <Cards task={task} key={task._id} />
               ))}
             </SortableContext>
           </Board>
           <Board title='doing'>
             <SortableContext
               items={doing.map(task => task._id)}
             >
               {doing.map(task => (
                 <Cards task={task} key={task._id} />
               ))}
             </SortableContext>
           </Board>
           <Board title='done'>
             <SortableContext
               items={done.map(task => task._id)}
             >
               {done.map(task => (
                 <Cards task={task} key={task._id} />
               ))}
             </SortableContext>
           </Board> */}
                </DndContext>
            </div>
        </div>
    )
}
