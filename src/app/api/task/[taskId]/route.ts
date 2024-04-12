import ProjectModel from "@/Models/projectModel";
import TaskModel from "@/Models/taskModel";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextApiRequest, { params }: { params: { taskId: string } }) => {
    try {
        await TaskModel.findByIdAndDelete(params.taskId)
        await ProjectModel.updateOne({ tasks: { $in: [params.taskId] } }, { $pull: { tasks: params.taskId } })
        return NextResponse.json("project")
    } catch (error) {
        console.log(error)
    }
}

export const PUT = async (req: NextRequest, { params }: { params: { taskId: string } }) => {
    try {
        const data = await req.json()
        console.log("object")
        await TaskModel.findByIdAndUpdate(params.taskId, data)
        return NextResponse.json("project")
    } catch (error) {
        console.log(error)
    }
}