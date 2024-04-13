import ProjectModel from "@/Models/projectModel"
import TaskModel from "@/Models/taskModel"
import { Task } from "@/types/SchemasTypes"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (_: any, { params }: { params: { projectId: string } }) => {
    try {
        const project = await ProjectModel.findById(params.projectId).populate("userId").populate("tasks")
        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json(error)
    }
}
export const DELETE = async (_: any, { params }: { params: { projectId: string } }) => {
    try {
        await ProjectModel.findByIdAndDelete(params.projectId)
        return NextResponse.json({ message: "deleted" })
    } catch (error) {
        return NextResponse.json(error)
    }
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
export const PUT = async (req: NextRequest, { params }: { params: { projectId: string } }) => {
    try {
        const data = await req.json()
        await ProjectModel.findByIdAndUpdate(params.projectId, { title: data.title, $push: { members: data.members.id } })
        return NextResponse.json({ message: "Data has been submitted!" });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error });
    }
}