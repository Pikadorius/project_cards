import React from 'react'

import sort from '../../../assets/filterRemove.svg'

import s from './ResetSort.module.scss'

export const ResetSort = () => {
  return (
    <div className={s.container}>
      <h3 className={s.title}>Reset Sort</h3>
      <div className={s.sort}>
        <img className={s.sortIcon} src={sort} alt="reset sort" />
      </div>
    </div>
  )
}
