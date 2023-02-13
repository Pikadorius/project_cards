import React from 'react'

import sort from '../../../assets/filterRemove.svg'
import { resetAll, setSearchParams } from '../../../featuries/packs/packsSlice'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { useAppSelector } from '../../hooks/AppSelector'

import s from './ResetSort.module.scss'

export const ResetSort = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.packs.searchParams.user_id)

  const onClick = () => {
    dispatch(resetAll())
    dispatch(setSearchParams({ user_id: userId }))
  }

  return (
    <div className={s.container}>
      <h3 className={s.title}>Reset Sort</h3>
      <div className={s.sort}>
        <img className={s.sortIcon} src={sort} alt="reset sort" onClick={onClick} />
      </div>
    </div>
  )
}
