import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGnameByYear } from "../../Utils/Fetchs/GnameByYears";
import { GetbyStorGname } from "../../Utils/Fetchs/getByStronGname";

export const fetchGnameByYear = createAsyncThunk("cases/fetchBoldGname", async (_:{year:number,org:string}, thunkApi) => {

    const response = await getGnameByYear(_);

    if (!response) {
        return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
})

export const fetchGetbyStorGname = createAsyncThunk("casess/fetchBoldGname", async (_:string, thunkApi) => {

    const response = await GetbyStorGname(_);
    console.log(response);

    if (!response) {
        return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
})