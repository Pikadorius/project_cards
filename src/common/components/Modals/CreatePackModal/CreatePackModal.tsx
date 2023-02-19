import React from 'react'

import { setModal } from '../../../../app/appSlice'
import { createPackTC } from '../../../../features/packs/packsSlice'
import { useAppDispatch } from '../../../hooks'
import { resetModalValues } from '../../../utils'
import ModalButtons from '../ModalButtons/ModalButtons'

const CreatePackModal = () => {
  const dispatch = useAppDispatch()

  const cancelHandler = () => {
    resetModalValues(dispatch)
  }
  const createPack = () => {
    dispatch(createPackTC({ cardsPack: { name: 'test pack' } }))
    dispatch(setModal('idle'))
  }

  return (
    <div>
      <ModalButtons onCancel={cancelHandler} onSuccess={createPack} successBtnName={'Add'} />
    </div>
  )
}

export default CreatePackModal
