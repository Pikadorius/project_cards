import React, { useState } from 'react'

import { setSearchParams } from '../../../featuries/packs/packsSlice'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { useAppSelector } from '../../hooks/AppSelector'

import s from './ButtonGroupe.module.scss'

export const ButtonGroupe = () => {
  const userId = useAppSelector(state => state.auth.user._id)
  const paramId = useAppSelector(state => state.packs.searchParams.user_id)
  const cardsPack = useAppSelector(state => state.packs.cardPacks)
  const [countPack] = cardsPack

  const dispatch = useAppDispatch()

  const [toggle, setToggle] = useState<string | null>(paramId ? 'my' : 'all')

  const showUserPacksHandler = () => {
    setToggle('my')
    // dispatch(resetMinMax())
    dispatch(setSearchParams({ user_id: userId, page: 1, min: 0, max: 0 }))
  }

  const showAllPacksHandler = () => {
    setToggle('all')
    // dispatch(resetMinMax())
    dispatch(setSearchParams({ user_id: undefined, page: 1, min: 0, max: 0 }))
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
