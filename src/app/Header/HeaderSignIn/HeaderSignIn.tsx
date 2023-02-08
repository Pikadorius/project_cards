import React from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import { PATH } from '../../../common/constans/path'

import s from './HeaderSignIn.module.scss'

const HeaderSignIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const disable = location.pathname === '/login'

  return (
    <button disabled={disable} className={s.btn} onClick={() => navigate(PATH.LOGIN)}>
      Sign In
    </button>
  )
}

export default HeaderSignIn
