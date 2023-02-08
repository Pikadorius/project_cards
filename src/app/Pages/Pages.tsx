import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { PATH } from '../../common/constans/path'
import { Login } from '../../featuries/auth/Login/Login'
import { CheckInfoRecovery } from '../../featuries/auth/Recovery/CheckInfoRecovery'
import { NewPassword } from '../../featuries/auth/Recovery/NewPassword'
import { Recovery } from '../../featuries/auth/Recovery/Recovery'
import { Registration } from '../../featuries/auth/Registration/Registration'

import { Profile } from './Profile/Profile'
import RequireAuth from './RequireAuth'

const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Registration />} />
      <Route path={PATH.RECOVERY} element={<Recovery />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />}>
        <Route path="*" element={<Navigate to={PATH.NEW_PASSWORD} />} />
        <Route path=":resetPasswordToken" element={<NewPassword />} />
      </Route>
      <Route path={PATH.RECOVERY_INFO} element={<CheckInfoRecovery />} />
      <Route element={<RequireAuth />}>
        <Route path={'/'} element={<Navigate to={'/profile'} />} />
        <Route path={PATH.ACCOUNT} element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default Pages
