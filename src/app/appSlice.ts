import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type InitialStateType = {
    appError: string | null
}

const initialState: InitialStateType = {
    appError: null
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<string | null>) => {
            state.appError = action.payload
        }
    },
});

export const {setAppError}=appSlice.actions

export const appReducer = appSlice.reducer
