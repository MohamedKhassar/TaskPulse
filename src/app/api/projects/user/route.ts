import User from "@/Models/userModel"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        const search = req.nextUrl.searchParams.get("search")
        const users = await User.find({ email: search })
        return NextResponse.json(users)
    } catch (error) {
        console.log(error)
    }
}