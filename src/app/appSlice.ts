import {createSlice} from "@reduxjs/toolkit";


type InitialStateType = {
    appError: string | null
}

const initialState: InitialStateType = {
    appError: null
}

export const appSlice = createSlice({
    name: "app",
    initialState: {},
    reducers: {},
});
