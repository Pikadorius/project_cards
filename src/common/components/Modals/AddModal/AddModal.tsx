import React, { FC } from 'react'

import { useAppDispatch } from '../../../hooks'

type AddModalType = {
  title: string
  onClick: (newTitle: string) => void
}

const AddModal: FC<AddModalType> = ({ title, onClick }) => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <input value={title} />
    </div>
  )
}

export default AddModal
