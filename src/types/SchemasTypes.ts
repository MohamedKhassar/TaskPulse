import mongoose from "mongoose"

export type Project = {
    title: string
    userId: mongoose.Schema.Types.ObjectId
    column: string[],
    tasks: Task[] | undefined,
    members: string[] | undefined
}

export type Task = {
    taskName: string,
    description: string | undefined,
    priority: TaskPriority,
    status: TaskStatus,
    created_at: Date,
    deadline: Date,
    assignedTo: string,
    stared: boolean
}

export enum TaskPriority {
    High = "High",
    Medium = "Medium",
    Low = "Low"
}

export enum TaskStatus {
    ToDo = "ToDo",
    Doing = "Doing",
    Done = "Done"
}

export type 