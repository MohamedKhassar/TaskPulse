import { Task } from "@/types/SchemasTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteTaskById = createAsyncThunk(
    'tasks/deleteById',
    async (taskId: string, thunkAPI) => {
        try {
            await axios.delete(`/api/task/${taskId}`);
        } catch (error) {
            const message = (error as Error).message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const getTaskById = createAsyncThunk(
    'tasks/getById',
    async (taskId: string, thunkAPI) => {
        try {
            await axios.get(`/api/task/${taskId}`);
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
            await axios.put(`/api/task/${taskId}`, taskUpdate);
        } catch (error) {
            const message = (error as Error).message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
