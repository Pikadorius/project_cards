import { RootStateType } from 'store/store'

export const modalTypeSelector = (state: RootStateType) => state.modal.modalType

// export const modalItemIdSelector = (state: RootStateType) => state.modal.changedItemId
export const userBlockIDSelector = (state: RootStateType) => state.modal.userBlockID
export const isPackDeletedSelector = (state: RootStateType) => state.modal.isPackDeleted
