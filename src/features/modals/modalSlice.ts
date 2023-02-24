import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ModalType =
  | 'createPack'
  | 'deletePack'
  | 'updatePack'
  | 'updateCard'
  | 'createCard'
  | 'deleteCard'
  | 'blockUser'
  | 'idle'

const initialState = {
  modalType: 'idle' as ModalType,
  changedItemId: '',
  changedItemName: '',
  changedItemAnswer: '',
  changedItemCardsId: '',
  isPackDeleted: false,
}

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload
    },
    setChangedItemId: (state, action: PayloadAction<string>) => {
      state.changedItemId = action.payload
    },
    setChangedItemName: (state, action: PayloadAction<string>) => {
      state.changedItemName = action.payload
    },
    setChangedItemAnswer: (state, action: PayloadAction<string>) => {
      state.changedItemAnswer = action.payload
    },
    setChangedItemCardsId: (state, action: PayloadAction<string>) => {
      state.changedItemCardsId = action.payload
    },
    setIsPackDeleted: (state, action: PayloadAction<boolean>) => {
      state.isPackDeleted = action.payload
    },
  },
})

export const {
  setModal,
  setChangedItemId,
  setChangedItemName,
  setChangedItemCardsId,
  setChangedItemAnswer,
  setIsPackDeleted,
} = modalSlice.actions

export const modalReducer = modalSlice.reducer
