import { FieldValues } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import eye from '../../../assets/eye.svg'
import { Button } from '../../../common/components/Button/Button'
import { CheckBox } from '../../../common/components/CheckBox/CheckBox'
import { FormWrapper } from '../../../common/components/Form/FormWrapper/FormWrapper'
import s from '../../../common/components/Form/FormWrapper/FormWrapper.module.scss'
import { Input } from '../../../common/components/Input/Input'
import { PATH } from '../../../common/constans/path'
import { useAppDispatch } from '../../../common/hooks/AppDispatch'
import { useAppSelector } from '../../../common/hooks/AppSelector'
import { formHandler } from '../../../common/utils/formHandler'
import { loginTC } from '../authSlice'

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const { errorEmail, errorPassword, handleSubmit, isValid, register } = formHandler(
    'email',
    'password'
  )
  const onSubmit = (data: FieldValues) => {
    dispatch(loginTC(data))
  }

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />
  }

  return (
    <FormWrapper
      title={'Sign In'}
      forgot={true}
      recoveryPath={PATH.RECOVERY}
      questionText={'Do not have an account?'}
      linkPath={PATH.REGISTER}
      linkTitle={'Sign Up'}
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

        <Input
          type={'password'}
          label={'Password'}
          altForIcon={'show password'}
          placeholder={'example12'}
          icon={eye}
          register={register}
          error={errorPassword}
          nameForValidate={'password'}
        />
        <CheckBox label={'Remember Me'} nameForValidate={'rememberMe'} register={register} />
        <Button isValid={isValid} title={'Sign In'} type={'submit'}></Button>
      </form>
    </FormWrapper>
  )
}
