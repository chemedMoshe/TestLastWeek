import { createSlice } from "@reduxjs/toolkit";
import { fetchCasesByYears, fetchHighNkillCases } from "../extraReduser/Cases";
import { CaseSlice } from "../../Types/CasesSlice";
import { fetchGnameByYear } from "../extraReduser/organisation";

const initialState: CaseSlice = {
    Graf: null,
    loading: false,
    error: "",
    success: false

};

const GrafSlice = createSlice({
    name: "Graf",
    initialState: initialState,
    reducers: {
        addData: (state, action) => {
            state.Graf = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHighNkillCases.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchHighNkillCases.fulfilled, (state, action) => {
            state.loading = false;
            state.Graf = action.payload;

        });
        builder.addCase(fetchHighNkillCases.rejected, (state, action) => {
            state.error = action.payload as string;
        });
        builder.addCase(fetchCasesByYears.fulfilled, (state, action) => {
            state.loading = false;
            state.Graf = action.payload;
            
        });
        builder.addCase(fetchCasesByYears.rejected, (state, action) => {
            state.error = action.payload as string;
        })
        builder.addCase(fetchGnameByYear.fulfilled, (state, action) => {
            state.loading = false;
            state.Graf = action.payload;
        })
    }
}
);
export const { addData } = GrafSlice.actions
export default GrafSlice;