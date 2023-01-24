import {createSlice} from '@reduxjs/toolkit';

type InitialStateType = any
const initialState: InitialStateType = {}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
})

export default profileSlice.reducer