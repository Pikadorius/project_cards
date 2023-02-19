import React, { FC } from 'react'

import { setModal } from 'app/appSlice'
import { useAppDispatch } from 'common/hooks'
import { deletePackTC } from 'features/packs/packsSlice'

type DeleteModalType = {
  name: string
  id: string
}
const DeleteModal: FC<DeleteModalType> = ({ name, id }) => {
  const dispatch = useAppDispatch()

  const cancelHandler = () => {
    dispatch(setModal('idle'))
  }

  const deleteModal = () => {
    dispatch(deletePackTC(id))
    dispatch(setModal('idle'))
  }

  return (
    <div>
      <div>{`Do you really want to remove ${name}? All cards will be deleted.`}</div>
      <button onClick={cancelHandler}>Cancel</button>
      <button onClick={deleteModal}>Delete</button>
    </div>
  )
}

export default DeleteModal
