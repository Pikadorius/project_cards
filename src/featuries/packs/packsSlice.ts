import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppError, setAppStatus } from '../../app/appSlice'
import { RootStateType } from '../../common/hooks/AppSelector'
import { errorUtils } from '../../common/utils/errorHandler'

import { packsAPI } from './packsAPI'
import {
  CreatePackRequestType,
  GetPacksResponseType,
  PacksQueryParamsType,
  PackType,
} from './packsType'

export type SearchParamsType = {
  packName: string
  user_id: string
  page: number
  pageCount: number
  min: number | undefined
  max: number | undefined
  sortPack: string
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
    user_id: '',
    packName: '',
    page: 1,
    pageCount: 10,
    min: undefined,
    max: undefined,
    sortPack: '',
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
      if (state.searchParams.min === undefined) {
        state.searchParams.min = action.payload.minCardsCount
      }
      if (state.searchParams.max === undefined) {
        state.searchParams.max = action.payload.maxCardsCount
      }
    },
    setSearchParams: (state, action: PayloadAction<PacksQueryParamsType>) => {
      state.searchParams = { ...state.searchParams, ...action.payload }
    },
    resetAll: state => {
      state.searchParams = initialState.searchParams
    },
    resetMinMax: state => {
      state.searchParams.min = undefined
      state.searchParams.max = undefined
    },
  },
})

export const { setState, setSearchParams, resetAll, resetMinMax } = packsSlice.actions

const packsReducer = packsSlice.reducer

export default packsReducer
