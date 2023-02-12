import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppError, setAppStatus } from '../../app/appSlice'
import { RootStateType } from '../../common/hooks/AppSelector'
import { errorUtils } from '../../common/utils/errorHandler'

import { packsAPI } from './packsAPI'
import { CreatePackRequestType, GetPacksResponseType, PackType } from './packsType'

export type SearchParamsType = {
  packName: string | undefined
  user_id: string | undefined
  page: number
  pageCount: number
  min: number
  max: number
  sortPack: string | undefined
  totalPagesCount: number
  minCardsCount: number
  maxCardsCount: number
}

type InititalStateType = {
  cardPacks: PackType[]
  searchParams: SearchParamsType
}

const initialState: InititalStateType = {
  cardPacks: [],
  searchParams: {
    user_id: undefined,
    packName: undefined,
    page: 1,
    pageCount: 10,
    min: 0,
    max: 0,
    sortPack: undefined,
    totalPagesCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
  },
}

export const fetchPacksTC = createAsyncThunk('fetchPacks', async (_, { dispatch, getState }) => {
  const state = getState() as RootStateType
  const params = state.packs.searchParams

  dispatch(setAppStatus('loading'))
  try {
    const res = await packsAPI.getPacks(params)

    console.log(res)
    // const { maxCardsCount, pageCount, page, minCardsCount, cardPacksTotalCount } = res.data
    if (res.data.cardPacks.length === 0) {
      dispatch(setAppError('Not found. Change the request parameters'))
    }
    dispatch(setState(res.data))
    dispatch(setAppStatus('success'))
  } catch (e: any) {
    errorUtils(e, dispatch)
  }
})

export const createPackTC = createAsyncThunk(
  'createPack',
  async (data: CreatePackRequestType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await packsAPI.createPack(data)

      dispatch(fetchPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
)

export const deletePackTC = createAsyncThunk('deletePack', async (id: string, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    const res = await packsAPI.deletePack(id)

    dispatch(fetchPacksTC())
  } catch (e: any) {
    errorUtils(e, dispatch)
  }
})

const packsSlice = createSlice({
  name: 'packsList',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<GetPacksResponseType>) => {
      state.cardPacks = action.payload.cardPacks
      state.searchParams.page = action.payload.page
      state.searchParams.pageCount = action.payload.pageCount
      state.searchParams.minCardsCount = action.payload.minCardsCount
      state.searchParams.maxCardsCount = action.payload.maxCardsCount
      state.searchParams.totalPagesCount = Math.ceil(
        action.payload.cardPacksTotalCount / action.payload.pageCount
      )
    },
    setSearchParams: (state, action: PayloadAction<SearchParamsType>) => {
      state.searchParams = { ...state.searchParams, ...action.payload }
    },
    setMinMax: (state, action: PayloadAction<number[]>) => {
      state.searchParams = { ...state.searchParams, min: action.payload[0], max: action.payload[1] }
    },
  },
})

export const { setState, setSearchParams, setMinMax } = packsSlice.actions

const packsReducer = packsSlice.reducer

export default packsReducer
