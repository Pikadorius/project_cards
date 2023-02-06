import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isInitialized: false
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {},
});
