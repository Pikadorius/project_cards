import React from 'react'

import { AccountMenu } from '../../../common/components/AccountMenu/AccountMenu'
import { useAppSelector } from '../../../common/hooks/AppSelector'
import { userNameHandler } from '../../../common/utils/userNameHandler'

import s from './HeaderProfile.module.scss'

const HeaderProfile = () => {
  const user = useAppSelector(state => state.auth.user)
  const userName = userNameHandler(user.name)

  return (
    <div className={s.profileContainer}>
      <div className={s.userName}>{userName}</div>
      <AccountMenu />
    </div>
  )
}

export default HeaderProfile
