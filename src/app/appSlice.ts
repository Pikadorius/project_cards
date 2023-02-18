import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StatusType = 'idle' | 'loading' | 'failed' | 'success'

// type PackListTileType = 'Name' | 'Cards' | 'Last Updated' | 'Created by' | 'Actions'
//
// type SortName = 'name' | 'cardsCount' | 'updated' | 'user_name'

const packList = [
  { title: 'Name', status: 0, sortName: 'name' },
  { title: 'Cards', status: 0, sortName: 'cardsCount' },
  { title: 'Last Updated', status: 0, sortName: 'updated' },
  { title: 'Created by', status: 0, sortName: 'user_name' },
  { title: 'Actions', status: 0 },
]

const cardList = [
  { title: 'Question', status: 0, sortName: 'question' },
  { title: 'Answer', status: 0, sortName: 'answer' },
  { title: 'Last Updated', status: 0, sortName: 'updated' },
  { title: 'Grade', status: 0, sortName: 'grade' },
]

export type CardListType = typeof cardList

export type PackListType = typeof packList

type InitialStateType = {
  appError: string | null
  appStatus: StatusType
  isInitialized: boolean
  isModalActive: boolean
  packList: PackListType
  cardList: CardListType
}

const initialState: InitialStateType = {
  appError: null,
  appStatus: 'idle',
  isInitialized: false,
  isModalActive: true,
  packList,
  cardList,
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
    setSortStatusPack: (state, action: PayloadAction<PackListType>) => {
      state.packList = action.payload
    },
    setSortStatusCards: (state, action: PayloadAction<CardListType>) => {
      state.cardList = action.payload
    },
    resetSort: state => {
      state.packList = state.packList.map(t => (t.status ? { ...t, status: 0 } : t))
    },
    setModalActive: (state, action: PayloadAction<boolean>) => {
      state.isModalActive = action.payload
    },
  },
})

export const {
  setAppError,
  isInitialized,
  setAppStatus,
  setSortStatusPack,
  setSortStatusCards,
  resetSort,
  setModalActive,
} = appSlice.actions

export const appReducer = appSlice.reducer
