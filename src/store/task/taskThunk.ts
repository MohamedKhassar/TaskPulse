import { Task } from "@/types/SchemasTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteTaskById = createAsyncThunk(
    'tasks/deleteById',
    async (taskId: string, thunkAPI) => {
        try {
            await axios.delete(`${process.env.BASE_URL}/api/task/${taskId}`);
            return taskId;
        } catch (error) {
            const message = (error as Error).message
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateTask = createAsyncThunk(
    'tasks/update',
    async ({ taskId, taskUpdate }: { taskId: string, taskUpdate: Task }, thunkAPI) => {
        try {
            const response = await axios.put(`${process.env.BASE_URL}/api/task/${taskId}`, taskUpdate);
            return response.data;
        } catch (error) {
            const message = (error as Error).message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
