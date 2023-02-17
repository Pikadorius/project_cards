import React from 'react'

import { AccountMenu } from '../../AccountMenu/AccountMenu'

import s from './HeaderProfile.module.scss'

import { useAppSelector } from 'common/hooks/useAppSelector'
import { userNameHandler } from 'common/utils/userNameHandler'

export const HeaderProfile = () => {
  const user = useAppSelector(state => state.auth.user)
  const userName = userNameHandler(user.name)

  return (
    <div className={s.profileContainer}>
      <div className={s.userName}>{userName}</div>
      <AccountMenu />
    </div>
  )
}
