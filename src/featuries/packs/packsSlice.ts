import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GetPacksResponseType, PackType } from './packsType'

const initialState = {
  cardPacks: [] as PackType[],
  page: 0,
  pageCount: 0,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
  token: '',
  tokenDeathTime: 0,
} as GetPacksResponseType

export const fetchPacks = createAsyncThunk('fetchPacks', () => {})

const packsSlice = createSlice({
  name: 'packsList',
  initialState,
  reducers: {
    setPacks: (state, action: PayloadAction<GetPacksResponseType>) => {
      state = action.payload
    },
  },
})

const { setPacks } = packsSlice.actions

const packsReducer = packsSlice.reducer

export default packsReducer
