import { RootStateType } from '../store/store'

export const appStatusSelector = (state: RootStateType) => state.app.appStatus
export const appErrorSelector = (state: RootStateType) => state.app.appError

export const isInitializedSelector = (state: RootStateType) => state.app.isInitialized

export const modalTypeSelector = (state: RootStateType) => state.app.modalType

export const modalItemIdSelector = (state: RootStateType) => state.app.changedItemId
export const modalItemNameSelector = (state: RootStateType) => state.app.changedItemName

export const modalItemCardsIdSelector = (state: RootStateType) => state.app.changedItemCardsId
export const modalItemAnswerSelector = (state: RootStateType) => state.app.changedItemAnswer

export const isPackDeletedSelector = (state: RootStateType) => state.app.isPackDeleted
