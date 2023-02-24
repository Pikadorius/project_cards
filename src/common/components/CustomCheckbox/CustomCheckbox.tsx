import React, { ChangeEvent, FC } from 'react'

import s from './CustomCheckbox.module.scss'

type PropsType = {
  checked: boolean
  onChange: (checked: boolean) => void
  title?: string
}
const CustomCheckbox: FC<PropsType> = ({ checked, onChange, title }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.checked)
  }

  return (
    <div>
      <label className={s.checkboxField}>
        <input
          className={s.checkbox}
          type={'checkbox'}
          checked={checked}
          onChange={onChangeHandler}
        />
        <div className={s.checkboxTitle}>{title}</div>
      </label>
    </div>
  )
}

export default CustomCheckbox
