import React from 'react'

import { modalItemIdSelector, modalItemNameSelector } from '../../../../app/appSelectors'
import { updatePackTC } from '../../../../features/packs/packsSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { resetModalValues } from '../../../utils'
import ModalButtons from '../ModalButtons/ModalButtons'

const UpdatePackModal = () => {
  const dispatch = useAppDispatch()
  const updatedItemId = useAppSelector(modalItemIdSelector)
  const updatedItemName = useAppSelector(modalItemNameSelector)

  const cancelHandler = () => {
    resetModalValues(dispatch)
  }

  const updateModal = () => {
    dispatch(updatePackTC({ cardsPack: { _id: updatedItemId, name: 'wuzzup' } }))
    resetModalValues(dispatch)
  }

  return (
    <div>
      <ModalButtons onCancel={cancelHandler} onSuccess={updateModal} successBtnName={'Save'} />
    </div>
  )
}

export default UpdatePackModal
