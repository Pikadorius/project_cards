import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/appSlice'
import { RootStateType } from '../../common/hooks/AppSelector'
import { errorUtils } from '../../common/utils/errorHandler'
import { SearchParamsType } from '../packs/packsSlice'
import { GetPacksResponseType } from '../packs/packsType'

import { cardAPI } from './cardAPI'
import { GetCardResponseType, InititalStateCardType } from './cardType'

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
    pageCount: 10,
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

      console.log(res)
      dispatch(setAppStatus('success'))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
)

const cardSlice = createSlice({
  name: 'cardListPage',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<GetCardResponseType>) => {},
  },
})

export const { setState } = cardSlice.actions

export const cardReducer = cardSlice.reducer
