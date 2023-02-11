import React from 'react'

import s from './PacksHeader.module.scss'

type PacksHeaderType = {
  title: string
  buttonTitle: string
}

export const PacksHeader: React.FC<PacksHeaderType> = React.memo(({ title, buttonTitle }) => {
  return (
    <div className={s.innerWrapper}>
      <h2>{title}</h2>
      <button className={s.btn}>{buttonTitle}</button>
    </div>
  )
})
