import React from 'react'

import { FieldValues } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'

import eye from '../../../assets/eye.svg'
import { Button } from '../../../common/components/Button/Button'
import { FormWrapper } from '../../../common/components/Form/FormWrapper/FormWrapper'
import s from '../../../common/components/Form/FormWrapper/FormWrapper.module.scss'
import { Input } from '../../../common/components/Input/Input'
import { PATH } from '../../../common/constans/path'
import { useAppDispatch } from '../../../common/hooks/AppDispatch'
import { useAppSelector } from '../../../common/hooks/AppSelector'
import { formHandler } from '../../../common/utils/formHandler'
import { setNewPasswordTC } from '../authSlice'

export const NewPassword = () => {
  let { resetPasswordToken } = useParams()
  const isPasswordChanged = useAppSelector(state => state.auth.isPasswordChanged)
  const dispatch = useAppDispatch()
  const { errorPassword, errorConfirmPwd, handleSubmit, isValid, register } = formHandler(
    'password',
    'confirmPwd'
  )
  const onSubmit = (data: FieldValues) => {
    const password = data.password

    console.log(data, { password, resetPasswordToken })
    dispatch(setNewPasswordTC({ password, resetPasswordToken }))
  }

  if (isPasswordChanged) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <FormWrapper title={'Create new password'} recoveryPath={PATH.NEW_PASSWORD}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type={'password'}
          label={'Password'}
          nameForValidate={'password'}
          altForIcon={'show password'}
          placeholder={'example12'}
          icon={eye}
          register={register}
          error={errorPassword}
        />

        <Input
          type={'password'}
          label={'Confirm password'}
          nameForValidate={'confirmPwd'}
          altForIcon={'show password'}
          placeholder={'********'}
          icon={eye}
          register={register}
          error={errorConfirmPwd}
        />
        <Button isValid={isValid} title={'New password'} type={'submit'} />
      </form>
    </FormWrapper>
  )
}
