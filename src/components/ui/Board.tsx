"use client"
import { cn } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React, { ReactNode } from 'react'

type Board = {
    _id: string
    boardName: string
    columns: string[]
}
type Column = {
    _id: string
    board: string
    columnName: string
    columnOrder: number
}

const Board = ({ children, board, column }: { children: ReactNode, board: Board, column?: Column }) => {
    const {
        attributes,
        setNodeRef,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: board?._id,
        data: {
            type: 'container',
        },
    });
    return (
        <div className={cn(column?.columnName == "To Do" ? "border-t-[#23B7E5]/40" : column?.columnName == "doing" ? "border-t-[#845ADF]/40" : "border-t-[#26BF94]/40"
            ,
            isDragging && "opacity-75",
            "rounded-lg p-3 bg-[#000000]/70 flex flex-col gap-y-5 border-t-[7px] capitalize")}  {...attributes}
            ref={setNodeRef}
            style={{
                transition,
                transform: CSS.Translate.toString(transform),
            }}>
            <h1 className='text-white text-lg'  {...listeners}>{column?.columnName}</h1>
            <div className='overflow-y-scroll flex flex-col gap-y-5 h-[300px] w-[320px] scroll'
            >
                {children}
            </div>
        </div>
    )
}

export default Board
