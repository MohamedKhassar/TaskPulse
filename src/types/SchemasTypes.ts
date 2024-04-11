import mongoose from "mongoose"

export type Project = {
    _id: string,
    title: string
    userId: User
    column: string[],
    tasks: Task[] | undefined,
    members: string[] | undefined
}

export type Task = {
    _id: string,
    taskName: string,
    description: string | undefined,
    priority: TaskPriority,
    status: TaskStatus,
    created_at: Date,
    deadline: Date,
    assignedTo: User[],
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

export type User = {
    id: string,
    name: string,
    email: string,
    image: string
    password: string
} 