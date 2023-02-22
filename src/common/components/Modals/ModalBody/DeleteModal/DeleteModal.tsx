import React, { FC } from 'react'

import ModalButtons from '../../ModalButtons/ModalButtons'

import s from './DeleteModal.module.scss'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { resetModalValues } from 'common/utils'
import { deleteCardTC } from 'features/cards/cardSlice'
import { modalItemIdSelector, modalItemNameSelector } from 'features/modals/modalSelectors'
import { setIsPackDeleted } from 'features/modals/modalSlice'
import { deletePackTC } from 'features/packs/packsSlice'

type DeleteModalType = {
  type: 'card' | 'pack'
}
const DeleteModal: FC<DeleteModalType> = ({ type }) => {
  const dispatch = useAppDispatch()
  const deletedItemId = useAppSelector(modalItemIdSelector)
  const deletedItemName = useAppSelector(modalItemNameSelector)

  const deleteModal = () => {
    type === 'pack'
      ? dispatch(deletePackTC(deletedItemId)).then(() => dispatch(setIsPackDeleted(true)))
      : dispatch(deleteCardTC(deletedItemId))
    resetModalValues(dispatch)
  }

  return (
    <div>
      <div className={s.description}>
        <p>
          Do you really want to remove <span className={s.itemName}>{`${deletedItemName}`}</span>?
        </p>
        {type === 'pack' ? <p>All cards will be deleted.</p> : <p>This card will be deleted.</p>}
      </div>
      <ModalButtons onSuccess={deleteModal} successBtnName={'Delete'} />
    </div>
  )
}

export default DeleteModal
