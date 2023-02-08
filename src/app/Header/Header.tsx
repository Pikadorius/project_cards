import React from 'react'

import logo from '../../assets/logo.svg'
import Logo from '../../common/components/Logo/Logo'
import { useAppSelector } from '../../common/hooks/AppSelector'

import s from './Header.module.scss'
import HeaderProfile from './HeaderProfile/HeaderProfile'
import HeaderSignIn from './HeaderSignIn/HeaderSignIn'

export const Header = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return (
    <header className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <Logo img={logo} />
          {isLoggedIn ? <HeaderProfile /> : <HeaderSignIn />}
        </div>
      </div>
    </header>
  )
}
