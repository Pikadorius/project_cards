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

const cardsList = [
  { title: 'Question', status: 0, sortName: 'question' },
  { title: 'Answer', status: 0, sortName: 'answer' },
  { title: 'Last Updated', status: 0, sortName: 'updated' },
  { title: 'Grade', status: 0, sortName: 'grade' },
]

export type CardsListType = typeof cardsList

export type PackListType = typeof packList

type InitialStateType = {
  appError: string | null
  appStatus: StatusType
  isInitialized: boolean
  packList: PackListType
  cardList: CardsListType
}

const initialState: InitialStateType = {
  appError: null,
  appStatus: 'idle',
  isInitialized: false,
  packList,
  cardList: cardsList,
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
    setSortStatusCards: (state, action: PayloadAction<CardsListType>) => {
      state.cardList = action.payload
    },
  },
})

export const { setAppError, isInitialized, setAppStatus, setSortStatusPack, setSortStatusCards } =
  appSlice.actions

export const appReducer = appSlice.reducer
