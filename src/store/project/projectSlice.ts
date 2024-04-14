import { createSlice } from '@reduxjs/toolkit';
import { createProject, createTaskInProject, deleteProjectById, fetchAllProjects, fetchProjectById, updateProjectById } from './projectThunk';
import { InitialProject } from '@/types/ReduxType';


const initialState: InitialProject = {
    projects: null,
    loading: false,
    error: null,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deleteProjectById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProjectById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteProjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchAllProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchAllProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(createProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProject.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(createTaskInProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTaskInProject.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createTaskInProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(updateProjectById.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProjectById.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateProjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    },
});

export default projectSlice.reducer;
