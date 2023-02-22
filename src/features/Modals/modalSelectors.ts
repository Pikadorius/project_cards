import { RootStateType } from '../../store/store'

export const modalTypeSelector = (state: RootStateType) => state.modal.modalType

export const modalItemIdSelector = (state: RootStateType) => state.modal.changedItemId
export const modalItemNameSelector = (state: RootStateType) => state.modal.changedItemName

export const modalItemCardsIdSelector = (state: RootStateType) => state.modal.changedItemCardsId
export const modalItemAnswerSelector = (state: RootStateType) => state.modal.changedItemAnswer

export const isPackDeletedSelector = (state: RootStateType) => state.modal.isPackDeleted
