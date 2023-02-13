import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '../../common/constans/path'
import { useAppSelector } from '../../common/hooks/AppSelector'
import { getIsLoggedIn } from '../../common/selectors/selectors'

const RequireAuth = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn)

  if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />

  return <Outlet />
}

export default RequireAuth
