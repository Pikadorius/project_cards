import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/appSlice'
import { errorUtils } from '../../common/utils/errorHandler'

import { packsAPI } from './packsAPI'
import { GetPacksResponseType, PacksQueryParamsType, PackType } from './packsType'

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

export const fetchPacks = createAsyncThunk(
  'fetchPacks',
  async (params: PacksQueryParamsType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await packsAPI.getPacks(params)

      console.log(res.data)
      dispatch(setPacks(res.data))
      dispatch(setAppStatus('success'))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
)

const packsSlice = createSlice({
  name: 'packsList',
  initialState,
  reducers: {
    setPacks: (state, action: PayloadAction<GetPacksResponseType>) => {
      return action.payload
    },
  },
})

const { setPacks } = packsSlice.actions

const packsReducer = packsSlice.reducer

export default packsReducer
