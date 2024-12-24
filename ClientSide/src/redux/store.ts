import { configureStore } from "@reduxjs/toolkit";
import caseMap from "./slice/MapSlice";
import GrafSlice from "./slice/GrafSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        Map: caseMap.reducer,
       Graf: GrafSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store