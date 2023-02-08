import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StatusType = 'idle' | 'loading' | 'failed' | 'success'

type InitialStateType = {
  appError: string | null
  appStatus: StatusType
  isInitialized: boolean
}

const initialState: InitialStateType = {
  appError: null,
  appStatus: 'idle',
  isInitialized: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<string | null>) => {
      state.appError = action.payload
    },
    setAppStatus: (state, action: PayloadAction<StatusType>) => {
      state.appStatus = action.payload
    },
    isInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    },
  },
})

export const { setAppError, isInitialized, setAppStatus } = appSlice.actions

export const appReducer = appSlice.reducer
