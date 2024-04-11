import { Task, TaskPriority, TaskStatus } from "@/types/SchemasTypes";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema<Task>({
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        enum: TaskPriority,
        default: TaskPriority.Low
    },
    status: {
        type: String,
        enum: TaskStatus,
        default: TaskStatus.Doing
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    deadline: {
        type: Date,
        required: true,
        default: Date.now()
    },
    assignedTo: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    stared: {
        type: Boolean,
        default: false
    }
})

const TaskModel = mongoose.models.Task || mongoose.model("Task", taskSchema)

export default TaskModel;