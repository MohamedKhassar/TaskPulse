import { createSlice } from "@reduxjs/toolkit";
import { deleteTaskById, updateTask } from "./taskThunk";
import { InitialTask } from "@/types/ReduxType";

const initialState: InitialTask = {
    tasks: [],
    loading: false,
    error: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteTaskById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTaskById.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteTaskById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTask.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default taskSlice.reducer;