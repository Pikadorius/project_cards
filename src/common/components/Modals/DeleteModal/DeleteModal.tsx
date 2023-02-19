import React from 'react'

import ModalButtons from '../ModalButtons/ModalButtons'

import s from './DeleteModal.module.scss'

import { modalItemIdSelector, modalItemNameSelector } from 'app/appSelectors'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { resetModalValues } from 'common/utils'
import { deletePackTC } from 'features/packs/packsSlice'

const DeleteModal = () => {
  const dispatch = useAppDispatch()
  const deletedItemId = useAppSelector(modalItemIdSelector)
  const deletedItemName = useAppSelector(modalItemNameSelector)

  const deleteModal = () => {
    dispatch(deletePackTC(deletedItemId))
    resetModalValues(dispatch)
  }

  return (
    <div>
      <div className={s.description}>
        <p>
          Do you really want to remove <span className={s.itemName}>{`${deletedItemName}`}</span>?
        </p>
        <p>All cards will be deleted.</p>
      </div>
      <ModalButtons onSuccess={deleteModal} successBtnName={'Delete'} />
    </div>
  )
}

export default DeleteModal
