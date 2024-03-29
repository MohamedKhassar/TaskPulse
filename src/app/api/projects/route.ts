import { NextRequest, NextResponse } from "next/server"
import "@/lib/mongodb"
import TaskModel from "@/Models/taskModel"
export const GET = async (req: NextRequest) => {
    try {
        const query = req.nextUrl.searchParams.get("query")
        const Task = query ? await TaskModel.where({ taskName: { $regex: query } }) : await TaskModel.find({})
        if (Task.length) {
            return NextResponse.json(Task)
        }
        return NextResponse.json({ message: "nothing found" })
    } catch (error) {
        console.log(error)
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const data = req.json();
        await TaskModel.create(data)
        return NextResponse.json({ message: "Data has been submitted!" });
    } catch (error) {
        console.log(error)
    }
}