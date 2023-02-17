import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { PATH } from '../../../constans/path'

import s from './HeaderSignIn.module.scss'

export const HeaderSignIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const disable = location.pathname === '/login'

  return (
    <button disabled={disable} className={s.btn} onClick={() => navigate(PATH.LOGIN)}>
      Sign In
    </button>
  )
}
