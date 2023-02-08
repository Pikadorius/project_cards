import React from 'react'

import { FieldValues } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'

import { Button } from '../../../common/components/Button/Button'
import { FormWrapper } from '../../../common/components/Form/FormWrapper/FormWrapper'
import s from '../../../common/components/Form/FormWrapper/FormWrapper.module.scss'
import { Input } from '../../../common/components/Input/Input'
import { PATH } from '../../../common/constans/path'
import { useAppDispatch } from '../../../common/hooks/AppDispatch'
import { useAppSelector } from '../../../common/hooks/AppSelector'
import { formHandler } from '../../../common/utils/formHandler'
import { recoveryTC } from '../authSlice'

export const Recovery = () => {
  const discriptionText = 'Enter your email address and we will send you further instructions'
  const messageText = 'Enter your email address and we will send you further instructions'
  const messageSend = useAppSelector(state => state.auth.isMessageSend)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { errorEmail, handleSubmit, isValid, register } = formHandler('email')
  const onSubmit = (data: FieldValues) => {
    const { email } = data

    dispatch(recoveryTC(email))
  }

  if (messageSend) {
    return <Navigate to={PATH.RECOVERY_INFO} />
  }

  return (
    <FormWrapper
      title={'Forgot your password?'}
      recoveryPath={PATH.RECOVERY}
      questionText={'Did you remember your password??'}
      linkPath={PATH.LOGIN}
      linkTitle={'Try logging in'}
    >
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type={'email'}
          label={'Email'}
          placeholder={'example@gmail.com'}
          register={register}
          error={errorEmail}
          nameForValidate={'email'}
        />

        {discriptionText}
        <Button isValid={isValid} title={'Send Instructions'} type={'submit'} />
      </form>
    </FormWrapper>
  )
}
