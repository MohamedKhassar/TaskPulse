import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./project/projectSlice";
import taskSlice from "./task/taskSlice";

const store = configureStore({
    reducer: {
        projectSlice,
        taskSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch