import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { PATH } from '../../common/constans/path'
import { Login } from '../../featuries/auth/Login/Login'
import { CheckInfoRecovery } from '../../featuries/auth/Recovery/CheckInfoRecovery'
import { NewPassword } from '../../featuries/auth/Recovery/NewPassword'
import { Recovery } from '../../featuries/auth/Recovery/Recovery'
import { Registration } from '../../featuries/auth/Registration/Registration'

import { CardList } from './CardListPage/CardList'
import { PackList } from './PackList/PackList'
import RequireAuth from './RequireAuth'
import { UserAccount } from './UserAccount/UserAccount'

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
        <Route path={'/'} element={<Navigate to={PATH.PACK_LIST} />} />
        <Route path={PATH.PACK_LIST} element={<PackList />} />
        <Route path={PATH.CARD_LIST} element={<CardList />} />
        <Route path={PATH.CARD_LIST_ID} element={<CardList />} />
        <Route path={PATH.ACCOUNT} element={<UserAccount />} />
      </Route>
    </Routes>
  )
}

export default Pages
