import {createSlice} from '@reduxjs/toolkit';

type InitialStateType = any
const initialState: InitialStateType = {}

const loginSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
})

export default loginSlice.reducer