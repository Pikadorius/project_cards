import React, { FC, memo } from 'react'

import s from './CardHeader.module.scss'

type CardsHeaderType = {
  title: string
  buttonTitle: string
  onClick: () => void
}

export const CardHeader: FC<CardsHeaderType> = memo(({ title, buttonTitle, onClick }) => {
  return (
    <div className={s.innerWrapper}>
      <h2>{title}</h2>
      <button onClick={onClick} className={s.btn}>
        {buttonTitle}
      </button>
    </div>
  )
})
