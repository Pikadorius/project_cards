import React, { useState } from 'react'

import { resetAll, setSearchParams } from '../../../featuries/packs/packsSlice'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { useAppSelector } from '../../hooks/AppSelector'

import s from './ButtonGroupe.module.scss'

export const ButtonGroupe = () => {
  const userId = useAppSelector(state => state.auth.user._id)
  const params = useAppSelector(state => state.packs.searchParams)

  const dispatch = useAppDispatch()

  const [toggle, setToggle] = useState<'all' | 'my'>('all')

  const showUserPacksHandler = () => {
    setToggle('my')
    dispatch(resetAll())
    dispatch(setSearchParams({ user_id: userId, min: 0, max: Infinity, page: 1 }))
  }

  const showAllPacksHandler = () => {
    setToggle('all')
    dispatch(resetAll())
    dispatch(setSearchParams({ user_id: undefined, page: 1 }))
  }

  return (
    <div className={s.container}>
      <h3 className={s.title}>Show packs cards</h3>
      <div className={s.buttonGroupe}>
        <button
          onClick={showUserPacksHandler}
          className={toggle === 'my' ? `${s.btn} ${s.active}` : s.btn}
        >
          My
        </button>
        <button
          onClick={showAllPacksHandler}
          className={toggle === 'all' ? `${s.btn} ${s.active}` : s.btn}
        >
          All
        </button>
      </div>
    </div>
  )
}
