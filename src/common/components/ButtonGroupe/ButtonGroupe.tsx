import React, { useEffect, useState } from 'react'

import { resetAll, resetMinMax, setSearchParams } from '../../../featuries/packs/packsSlice'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { useAppSelector } from '../../hooks/AppSelector'

import s from './ButtonGroupe.module.scss'

export const ButtonGroupe = () => {
  const userId = useAppSelector(state => state.auth.user._id)
  const isMyPack = useAppSelector(state => state.packs.cardPacks.every(t => t.user_id === userId))

  console.log(isMyPack)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setToggle(isMyPack ? 'my' : 'all')
  }, [isMyPack])

  const [toggle, setToggle] = useState<'all' | 'my'>(isMyPack ? 'my' : 'all')

  const showUserPacksHandler = () => {
    setToggle('my')
    // dispatch(resetMinMax())
    dispatch(setSearchParams({ user_id: userId, page: 1, min: undefined, max: undefined }))
  }

  const showAllPacksHandler = () => {
    setToggle('all')
    // dispatch(resetMinMax())
    dispatch(setSearchParams({ user_id: undefined, page: 1, min: undefined, max: undefined }))
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
