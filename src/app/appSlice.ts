import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StatusType = 'idle' | 'loading' | 'failed' | 'success'

type PackListTileType = 'Name' | 'Cards' | 'Last Updated' | 'Created by' | 'Actions'

type SortName = 'name' | 'cardsCount' | 'updated' | 'user_name'

const packList = [
  { title: 'Name', status: 0, sortName: 'name' },
  { title: 'Cards', status: 0, sortName: 'cardsCount' },
  { title: 'Last Updated', status: 0, sortName: 'updated' },
  { title: 'Created by', status: 0, sortName: 'user_name' },
  { title: 'Actions', status: 0 },
]

export type PackListType = typeof packList

type InitialStateType = {
  appError: string | null
  appStatus: StatusType
  isInitialized: boolean
  packList: PackListType
}

const initialState: InitialStateType = {
  appError: null,
  appStatus: 'idle',
  isInitialized: false,
  packList,
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
    setSortStatus: (state, action: PayloadAction<PackListType>) => {
      state.packList = action.payload
    },
  },
})

export const { setAppError, isInitialized, setAppStatus, setSortStatus } = appSlice.actions

export const appReducer = appSlice.reducer
