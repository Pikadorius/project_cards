import {createSlice} from '@reduxjs/toolkit';

type InitialStateType = any
const initialState: InitialStateType = {}

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {},
})

export default registrationSlice.reducer