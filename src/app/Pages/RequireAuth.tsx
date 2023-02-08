import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '../../common/constans/path'
import { useAppSelector } from '../../common/hooks/AppSelector'

const RequireAuth = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />

  return <Outlet />
}

export default RequireAuth
