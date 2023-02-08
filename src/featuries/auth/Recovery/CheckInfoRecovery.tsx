import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from '../../../app/Header/HeaderSignIn/HeaderSignIn.module.scss'
import sendMessage from '../../../assets/sendMessage.png'
import { FormWrapper } from '../../../common/components/Form/FormWrapper/FormWrapper'
import { PATH } from '../../../common/constans/path'
import { useAppSelector } from '../../../common/hooks/AppSelector'
import style from '../../../featuries/auth/Recovery/CheckInfoRecovery.module.css'

export const CheckInfoRecovery = () => {
  const navigate = useNavigate()

  const email = useAppSelector(state => state.auth.emailInRecovery)

  const onClickInInfoHandler = () => {
    navigate(PATH.LOGIN)
  }

  return (
    <FormWrapper title={'Check Email'}>
      <img src={sendMessage} alt={'sen message'} />
      <div className={style.discription}>
        We’ve sent an Email with instructions to <div>{email}</div>
      </div>
      <button className={s.btn} onClick={onClickInInfoHandler}>
        Back to login
      </button>
    </FormWrapper>
  )
}
