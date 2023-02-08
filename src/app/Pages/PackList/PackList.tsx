import React from 'react'

import { Navigate } from 'react-router-dom'

import { PATH } from '../../../common/constans/path'
import { useAppSelector } from '../../../common/hooks/AppSelector'

import s from './PackList.module.scss'

export const PackList = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.container}>
      <h2>Pack List</h2>
    </div>
  )
}
