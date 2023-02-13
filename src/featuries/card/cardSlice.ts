import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/appSlice'
import { RootStateType } from '../../common/hooks/AppSelector'
import { errorUtils } from '../../common/utils/errorHandler'

import { cardAPI } from './cardAPI'
import {
  CardQueryParamsType,
  CreateCardRequestType,
  GetCardResponseType,
  InititalStateCardType,
  UpdateCardObjType,
} from './cardType'

const initialState: InititalStateCardType = {
  cards: [],
  searchParams: {
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 0,
    sortCards: '',
    page: 1,
    pageCount: 5,
    packName: '',
    packUserId: '',
    cardsTotalCount: 0,
  },
}

export const fetchCardTC = createAsyncThunk(
  'fetchCard',
  async (cardsPackID: string, { dispatch, getState }) => {
    const state = getState() as RootStateType
    const params = state.card.searchParams

    dispatch(setAppStatus('loading'))
    try {
      const res = await cardAPI.getCard(params, cardsPackID)

      dispatch(setState(res.data))
      dispatch(setAppStatus('success'))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
)

export const createCardTC = createAsyncThunk(
  'createCard',
  async (data: CreateCardRequestType, { dispatch }) => {
    dispatch(setAppStatus('loading'))

    try {
      const res = await cardAPI.createCard(data)

      dispatch(fetchCardTC(data.card.cardsPack_id))
      dispatch(setAppStatus('success'))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
)

export const updateCardTC = createAsyncThunk(
  'updateCard',
  async (data: UpdateCardObjType, { dispatch }) => {
    dispatch(setAppStatus('loading'))

    try {
      const res = await cardAPI.updateCard(data.updateCard)

      dispatch(fetchCardTC(data.cardsPackID))
      dispatch(setAppStatus('success'))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
)

export const deleteCardTC = createAsyncThunk('deleteCard', async (data: string[], { dispatch }) => {
  dispatch(setAppStatus('loading'))

  try {
    const res = await cardAPI.deleteCard(data[0])

    dispatch(fetchCardTC(data[1]))
    dispatch(setAppStatus('success'))
  } catch (e: any) {
    errorUtils(e, dispatch)
  }
})

const cardSlice = createSlice({
  name: 'cardListPage',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<GetCardResponseType>) => {
      state.cards = action.payload.cards
      state.searchParams.page = action.payload.page
      state.searchParams.pageCount = action.payload.pageCount
      state.searchParams.max = action.payload.maxGrade
      state.searchParams.min = action.payload.minGrade
      state.searchParams.packName = action.payload.packName
      state.searchParams.packUserId = action.payload.packUserId
      state.searchParams.cardsTotalCount = action.payload.cardsTotalCount
    },
    setSearchCardParams: (state, action: PayloadAction<CardQueryParamsType>) => {
      state.searchParams = { ...state.searchParams, ...action.payload }
    },
  },
})

export const { setState, setSearchCardParams } = cardSlice.actions

export const cardReducer = cardSlice.reducer
