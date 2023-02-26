import React, { FC, memo } from 'react'

import s from './InputTypeFile.module.scss'

type InputType = {
  label: string
}

export const InputTypeFile: FC<InputType> = memo(({ label }) => {
  return (
    <>
      <label className={s.labelInput}>{label}</label>
      <div className={s.labelContainer}>
        <label className={s.label}>
          <span className={s.labelText}>Change cover</span>
          <input type="file" style={{ display: 'none' }} accept={'.png, .jpg, .jpeg, .gif'} />
        </label>
      </div>
    </>
  )
})
