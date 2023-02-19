import React, { FC } from 'react'

type AddModalType = {
  title: string
  onClick: (newTitle: string) => void
}

const AddModal: FC<AddModalType> = ({ title, onClick }) => {
  return <div>{/*<input value={title} />*/}</div>
}

export default AddModal
