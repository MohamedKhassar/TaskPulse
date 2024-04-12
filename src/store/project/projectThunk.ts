import { Project, Task, TaskStatus } from '@/types/SchemasTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProjectById = createAsyncThunk(
    'projects/fetchById',
    async (projectId: string, thunkAPI) => {
        try {
            const response = await axios.get(`${process.env.BASE_URL}/api/projects/${projectId}`);
            return response.data;
        } catch (error) {
            const message = (error as Error).message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const deleteProjectById = createAsyncThunk(
    'projects/deleteById',
    async (deletedId: string, thunkAPI) => {
        try {
            await axios.delete(`${process.env.BASE_URL}/api/projects/${deletedId}`);
        } catch (error) {
            const message = (error as Error).message
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchAllProjects = createAsyncThunk(
    'projects/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${process.env.BASE_URL}/api/projects`);
            return response.data;
        } catch (error) {
            const message = (error as Error).message
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createProject = createAsyncThunk(
    'projects/create',
    async ({ title, members, userId }: Project, thunkAPI) => {
        try {
            await axios.post(`${process.env.BASE_URL}/api/projects`, { title, members, userId });
        } catch (error) {
            const message = (error as Error).message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const createTaskInProject = createAsyncThunk(
    'projects/createTask',
    async ({ projectId, taskName, status }: { projectId: string, taskName: string, status: TaskStatus }, thunkAPI) => {
        try {
            await axios.post(`${process.env.BASE_URL}/api/projects/${projectId}`, { taskName, status });
        } catch (error) {
            const message = (error as Error).message
            return thunkAPI.rejectWithValue(message);
        }
    }
);
