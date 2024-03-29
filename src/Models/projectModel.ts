import { Project } from "@/types/SchemasTypes";
import mongoose from "mongoose";



const projectSchema = new mongoose.Schema<Project>({
    title: {
        type: String,
        required: true
    },
    column: {
        type: [String],
        default: ["ToDo", "Doing", "Doing"]
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    members: [String],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const ProjectModel = mongoose.models.Project || mongoose.model<Project>('Project', projectSchema)
export default ProjectModel