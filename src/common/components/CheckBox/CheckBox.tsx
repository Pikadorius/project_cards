import React from 'react'

import { FieldValues, UseFormRegister } from 'react-hook-form'

import s from './CheckBox.module.scss'

type CheckBoxType = {
  register: UseFormRegister<FieldValues>
  nameForValidate: string
  label: string
}

export const CheckBox: React.FC<CheckBoxType> = React.memo(
  ({ register, nameForValidate, label }) => {
    return (
      <label className={s.labelCheckbox}>
        <input {...register(nameForValidate)} className={s.checkbox} type="checkbox" />
        {label}
      </label>
    )
  }
)
