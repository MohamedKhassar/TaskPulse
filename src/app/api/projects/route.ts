import { NextRequest, NextResponse } from "next/server"
import "@/lib/mongodb"
import TaskModel from "@/Models/taskModel"
import ProjectModel from "@/Models/projectModel"
import { cookies } from "next/headers"
import { JWTDecodeParams, decode, getToken } from "next-auth/jwt"
export const GET = async (req: NextRequest, params: { userId: string }) => {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
        const projects = await ProjectModel.find({ userId: token?.sub }).populate("userId")
        return NextResponse.json(projects)
    } catch (error) {
        console.log(error)
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const { title, members, userId, tasks } = await req.json()
        await ProjectModel.create({ title, userId, $push: { members, tasks } })
        return NextResponse.json({ message: "Data has been submitted!" });
    } catch (error) {
        console.log(error)
    }
}