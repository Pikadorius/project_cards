import React from 'react'

import { setAppError } from '../../../app/appSlice'
import sort from '../../../assets/filterRemove.svg'
import { resetAll, setSearchParams } from '../../../featuries/packs/packsSlice'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { useAppSelector } from '../../hooks/AppSelector'

import s from './ResetSort.module.scss'

export const ResetSort = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.packs.searchParams.user_id)
  const packName = useAppSelector(state => state.packs.searchParams.packName)
  const page = useAppSelector(state => state.packs.searchParams.page)
  const min = useAppSelector(state => state.packs.searchParams.min)
  const max = useAppSelector(state => state.packs.searchParams.max)
  const pageCount = useAppSelector(state => state.packs.searchParams.pageCount)

  const onClick = () => {
    if (packName.length > 0 || page !== 1 || min !== 0 || max !== 0 || pageCount !== 10) {
      dispatch(resetAll())
      dispatch(setSearchParams({ user_id: userId }))
    } else {
      dispatch(setAppError('Nothing to reset...'))
    }
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
