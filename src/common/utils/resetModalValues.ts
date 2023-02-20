import { setChangedItemId, setChangedItemName, setModal } from '../../app/appSlice'
import { UseAppDispatch } from '../hooks/useAppDispatch'

export const resetModalValues = (dispatch: UseAppDispatch) => {
  dispatch(setModal('idle'))
  dispatch(setChangedItemId(''))
  dispatch(setChangedItemName(''))
}
