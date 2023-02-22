import { UseAppDispatch } from '../hooks/useAppDispatch'

import {
  setChangedItemAnswer,
  setChangedItemCardsId,
  setChangedItemId,
  setChangedItemName,
  setIsPackDeleted,
  setModal,
} from 'features/modals/modalSlice'

export const resetModalValues = (dispatch: UseAppDispatch) => {
  dispatch(setModal('idle'))
  dispatch(setChangedItemId(''))
  dispatch(setChangedItemName(''))
  dispatch(setChangedItemCardsId(''))
  dispatch(setChangedItemAnswer(''))
  dispatch(setIsPackDeleted(false))
}
