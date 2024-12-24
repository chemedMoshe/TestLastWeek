import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBoldGname, fetchMarkers } from "../extraReduser/Cases";
import { MapState } from "../../Types/MapSlice";
import { ExtraMarker } from "../../Types/CasesSlice";
import { fetchGetbyStorGname } from "../extraReduser/organisation";

const initialState:MapState = {
    loading: false,
    error: false,
    success: false,
    markers: [],
}

const caseMap = createSlice({
    name: "caseMap",
    initialState:initialState,
    reducers: {
         
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMarkers.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchMarkers.rejected, (state, action) => {
            state.error = true
            state.loading = false
        })
        builder.addCase(fetchMarkers.fulfilled, (state, action) => {
            state.markers = action.payload
            state.loading = false
            state.error = false
            state.success = true
            
        })
        builder.addCase(fetchBoldGname.pending, (state, action) => {
            state.loading = true
            state.error = false
            state.success = false   
        })
       
        builder.addCase(fetchGetbyStorGname.fulfilled, (state, action: PayloadAction<ExtraMarker[]>) => {
            state.markers = action.payload
            state.loading = false
            state.error = false
            state.success = true
            
        })
    },
});

export default caseMap;