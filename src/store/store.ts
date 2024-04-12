import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./project/projectSlice";

const store = configureStore({
    reducer: {
        projectSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch