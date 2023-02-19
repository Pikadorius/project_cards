import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ArrTypeCard, InititalStateLearnCardType } from '../cardType'

export enum AnswerStatuses {
  IsNoActive = 0,
  IsActive = 1,
}

let arr: InititalStateLearnCardType[] = [
  { id: 1, title: 'Did not know', status: AnswerStatuses.IsActive },
  { id: 2, title: 'Forgot', status: AnswerStatuses.IsNoActive },
  { id: 3, title: 'A lot of thought', status: AnswerStatuses.IsNoActive },
  { id: 4, title: 'Сonfused', status: AnswerStatuses.IsNoActive },
  { id: 5, title: 'Knew the answer', status: AnswerStatuses.IsNoActive },
]

const initialState: ArrTypeCard = {
  arr: arr,
}

const cardSlice = createSlice({
  name: 'learnCardPage',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<{ id: number; status: AnswerStatuses }>) => {
      state.arr = state.arr.map(e => ({ ...e, status: AnswerStatuses.IsNoActive }))

      let grade = state.arr.find(e => e.id === action.payload.id)

      if (grade) {
        grade.status = action.payload.status
      }
    },
  },
})

export const { changeStatus } = cardSlice.actions

export const learnCardReducer = cardSlice.reducer
