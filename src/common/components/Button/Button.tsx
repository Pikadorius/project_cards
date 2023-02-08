import React from 'react'

import s from './Button.module.scss'

type ButtonType = {
  type?: 'submit'
  title: string
  isValid: boolean
}

export const Button: React.FC<ButtonType> = React.memo(({ type, title, isValid }) => {
  return (
    <button disabled={!isValid} className={s.btn} type={type ? type : undefined}>
      {title}
    </button>
  )
})
