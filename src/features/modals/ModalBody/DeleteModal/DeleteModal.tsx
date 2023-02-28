import React, { FC } from 'react'

import ModalButtons from '../../ModalButtons/ModalButtons'

import s from './DeleteModal.module.scss'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { resetModalValues } from 'common/utils'
import { deleteCardTC } from 'features/cards/cardSlice'
import { setIsPackDeleted } from 'features/modals/modalSlice'
import { deletePackTC } from 'features/packs/packsSlice'
type DeleteModalType = {
  type: 'card' | 'pack'
}
const DeleteModal: FC<DeleteModalType> = ({ type }) => {
  const dispatch = useAppDispatch()
  const deletedPack = useAppSelector(state => state.modal.pack)
  const deletedCard = useAppSelector(state => state.modal.card)

  const deleteModal = () => {
    type === 'pack'
      ? dispatch(deletePackTC(deletedPack._id)).then(() => dispatch(setIsPackDeleted(true)))
      : dispatch(deleteCardTC(deletedCard._id))
    resetModalValues(dispatch)
  }

  return (
    <div>
      <div className={s.description}>
        <p>
          Do you really want to remove{' '}
          <span className={s.itemName}>
            {type === 'pack' ? deletedPack.name : deletedCard.question}
          </span>
          ?
        </p>
        {type === 'pack' ? <p>All cards will be deleted.</p> : <p>This card will be deleted.</p>}
      </div>
      <ModalButtons onSuccess={deleteModal} successBtnName={'Delete'} />
    </div>
  )
}

export default DeleteModal
