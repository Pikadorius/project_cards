import React, { FC, memo } from 'react'

import s from './PacksHeader.module.scss'

type PacksHeaderType = {
  title: string
  buttonTitle: string
}

export const PacksHeader: FC<PacksHeaderType> = memo(({ title, buttonTitle }) => {
  return (
    <div className={s.innerWrapper}>
      <h2>{title}</h2>
      <button className={s.btn}>{buttonTitle}</button>
    </div>
  )
})
