import React from 'react'

import { resetSort, setAppError } from '../../../app/appSlice'
import sort from '../../../assets/filterRemove.svg'
import { resetAll, setSearchParams } from '../../../features/packs/packsSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import s from './ResetSort.module.scss'

export const ResetSort = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.packs.searchParams.user_id)
  const packName = useAppSelector(state => state.packs.searchParams.packName)
  const page = useAppSelector(state => state.packs.searchParams.page)
  const min = useAppSelector(state => state.packs.searchParams.min)
  const max = useAppSelector(state => state.packs.searchParams.max)
  const pageCount = useAppSelector(state => state.packs.searchParams.pageCount)
  const sortPack = useAppSelector(state => state.packs.searchParams.sortPack)
  const onClick = () => {
    if (
      packName.length > 0 ||
      page !== 1 ||
      min !== 0 ||
      max !== 0 ||
      pageCount !== 10 ||
      sortPack !== ''
    ) {
      dispatch(resetAll())
      dispatch(resetSort())
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
