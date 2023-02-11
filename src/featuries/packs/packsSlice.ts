import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/appSlice'
import { RootStateType } from '../../common/hooks/AppSelector'
import { errorUtils } from '../../common/utils/errorHandler'

import { packsAPI } from './packsAPI'
import { GetPacksResponseType, PackType } from './packsType'

export type SearchParamsType = {
  packName: string | undefined
  user_id: string | undefined
  page: number
  pageCount: number
  min: number
  max: number
  sortPack: string | undefined
  totalPagesCount: number
}

type InititalStateType = {
  cardPacks: PackType[]
  searchParams: SearchParamsType
}

const initialState: InititalStateType = {
  cardPacks: [],
  searchParams: {
    user_id: '',
    packName: '',
    page: 1,
    pageCount: 10,
    min: 0,
    max: 200,
    sortPack: '',
    totalPagesCount: 0,
  },
}

export const fetchPacks = createAsyncThunk('fetchPacks', async (_, { dispatch, getState }) => {
  const state = getState() as RootStateType
  const params = state.packs.searchParams

  dispatch(setAppStatus('loading'))
  try {
    const res = await packsAPI.getPacks(params)

    const { maxCardsCount, pageCount, page, minCardsCount, cardPacksTotalCount } = res.data

    dispatch(setPacks(res.data))
    dispatch(setAppStatus('success'))
    dispatch(
      setSearchParams({
        ...params,
        page,
        max: maxCardsCount,
        min: minCardsCount,
        totalPagesCount: cardPacksTotalCount,
        pageCount,
      })
    )
  } catch (e: any) {
    errorUtils(e, dispatch)
  }
})

const packsSlice = createSlice({
  name: 'packsList',
  initialState,
  reducers: {
    setPacks: (state, action: PayloadAction<GetPacksResponseType>) => {
      state.cardPacks = action.payload.cardPacks
      state.searchParams.max = action.payload.maxCardsCount
      state.searchParams.totalPagesCount = Math.ceil(
        action.payload.cardPacksTotalCount / action.payload.pageCount
      )
    },
    setSearchParams: (state, action: PayloadAction<SearchParamsType>) => {
      state.searchParams = action.payload
    },
  },
})

export const { setPacks, setSearchParams } = packsSlice.actions

const packsReducer = packsSlice.reducer

export default packsReducer
