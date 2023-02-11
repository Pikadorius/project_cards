import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { PATH } from '../../../common/constans/path'
import { useAppDispatch } from '../../../common/hooks/AppDispatch'
import { useAppSelector } from '../../../common/hooks/AppSelector'
import { fetchPacks } from '../../../featuries/packs/packsSlice'

import s from './PackList.module.scss'

export const PackList = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchPacks({ pageCount: '20', packName: 'eng' }))
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.container}>
      <h2>Pack List</h2>
      {packs.map(p => {
        return <div key={p._id}>{p.name}</div>
      })}
    </div>
  )
}
