import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCasesByHighNkill } from "../../Utils/Fetchs/CasesByHighNkill";
import { getSumCasualties } from "../../Utils/Fetchs/GetMatkers";
import { getCasesByYear } from "../../Utils/Fetchs/casesByYear";
import { getBoldGname } from "../../Utils/Fetchs/getBoldGname";

export const fetchHighNkillCases = createAsyncThunk("cases/fetchCases", async (_: string[] | null[], thunkApi) => {

    const response = await getCasesByHighNkill(_);
    if (!response) {
        return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
});

export const fetchCasesByYears = createAsyncThunk("cases/casesByYear", async (_:{fromYear: number, toYear: number|undefined} , thunkApi) => {
    const res =await getCasesByYear(_); 
    if(!res) return thunkApi.rejectWithValue(res)
    return thunkApi.fulfillWithValue(res)
})
export const fetchMarkers = createAsyncThunk("cases/fetchMarkers", async (_: string | null, thunkApi) => {

    const response = await getSumCasualties(_);

    if (!response) {
        return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
});

export const fetchBoldGname = createAsyncThunk("cases/fetchBoldGname", async (_:{cantry:string,amount:number|undefined}, thunkApi) => {

    const response = await getBoldGname(_.cantry,_.amount!);
    
    if (!response) {
        return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
});