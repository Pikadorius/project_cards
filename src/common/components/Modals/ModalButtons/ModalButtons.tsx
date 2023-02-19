import React, { FC } from 'react'

import s from './ModalButtons.module.scss'

type ModalButtonType = {
  onCancel: () => void
  onSuccess: () => void
  successBtnName: string
}
const ModalButtons: FC<ModalButtonType> = ({ onCancel, successBtnName, onSuccess }) => {
  return (
    <div className={s.innerWrapper}>
      <button className={`${s.cancelBtn} ${s.btn}`} onClick={onCancel}>
        Cancel
      </button>
      <button className={s.btn} onClick={onSuccess}>
        {successBtnName}
      </button>
    </div>
  )
}

export default ModalButtons
