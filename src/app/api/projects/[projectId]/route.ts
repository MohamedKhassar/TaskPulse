import ProjectModel from "@/Models/projectModel"
import TaskModel from "@/Models/taskModel"
import { Task } from "@/types/SchemasTypes"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (_: any, { params }: { params: { projectId: string } }) => {
    const project = await ProjectModel.findById(params.projectId).populate("userId").populate("tasks")
    return NextResponse.json(project)
}
export const DELETE = async (_: any, { params }: { params: { projectId: string } }) => {
    await ProjectModel.findByIdAndDelete(params.projectId)
    return NextResponse.json({ message: "deleted" })
}

export const POST = async (req: NextRequest, { params }: { params: { projectId: string } }) => {
    try {
        const data = await req.json()
        const task = await TaskModel.create(data) as Task
        await ProjectModel.findByIdAndUpdate(params.projectId, { $push: { tasks: task._id } })
        return NextResponse.json({ message: "Data has been submitted!" });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error });
    }
}