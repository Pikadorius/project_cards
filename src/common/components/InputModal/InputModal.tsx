import React, { ChangeEvent, KeyboardEvent, FC, memo } from 'react'

import clear from '../../../assets/clear.png'

import s from './InputModal.module.scss'

type InputType = {
  label: string
  placeholder: string
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  reset: () => void
}

export const InputModal: FC<InputType> = memo(
  ({ label, placeholder, onKeyDown, value, onChange, reset }) => {
    return (
      <label className={s.labelInput}>
        {label}
        <div className={s.inputContainer}>
          <input
            className={s.input}
            onKeyDown={onKeyDown}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoFocus
          />
          <img className={s.delIcon} src={clear} alt="clear icon" onClick={reset} />
        </div>
      </label>
    )
  }
)
