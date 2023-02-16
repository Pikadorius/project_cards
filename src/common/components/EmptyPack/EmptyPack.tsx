import React, { memo } from 'react'

import emptyPack from '../../../assets/emptyPack.png'

import s from './EmptyPack.module.scss'

export const EmptyPack = memo(() => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <h3 className={s.title}>Nothing found!</h3>
          <img className={s.emptyPack} src={emptyPack} alt="packEmpty" />
          <div className={s.discription}>
            Click add new card to fill this pack or change the request parameters
          </div>
        </div>
      </div>
    </div>
  )
})
