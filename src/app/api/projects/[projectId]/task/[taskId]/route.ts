import ProjectModel from "@/Models/projectModel";
import TaskModel from "@/Models/taskModel";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const DELETE = async (req: NextApiRequest, { params }: { params: { projectId: string, taskId: string } }) => {
    try {
        await TaskModel.findByIdAndDelete(params.taskId)
        await ProjectModel.updateOne({ _id: params.projectId, tasks: { $in: [params.taskId] } }, { $pull: { tasks: params.taskId } })
        return NextResponse.json("project")
    } catch (error) {
        console.log(error)
    }
} 