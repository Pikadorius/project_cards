import { AxiosResponse } from 'axios'
import { FieldValues } from 'react-hook-form'

import { instance, instanceRec } from '../../common/constans/instance'
import { createMessage } from '../../common/utils/messageCreator'

export type UserResponseType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
}

export type RegistrationRequestType = {
  email: string
  password: string
}

export type SetNewPasswordType = {
  password: string
  resetPasswordToken: string | undefined
}

export type UpdateUserType = {
  name: string
  avatar?: string
}

export type BlockUserType = {
  id: string
  blockReason: string
}

export const authApi = {
  authMe: () => {
    return instance.post<{}, AxiosResponse<UserResponseType>>(`auth/me`)
  },
  update: (data: UpdateUserType) =>
    instance.put<UpdateUserType, AxiosResponse<{ updatedUser: UserResponseType }>>(`auth/me`, data),
  loggedIn: (data: FieldValues) => {
    return instance.post<FieldValues, AxiosResponse>(`auth/login`, data)
  },
  logout: () => instance.delete<{}, AxiosResponse<{ info: string }>>(`auth/me`),
  register: (data: RegistrationRequestType) => instance.post(`auth/register`, data),
  recoveryPassword: (email: string) => {
    return instanceRec.post<{}, AxiosResponse<{ info: string; error: string }>>(`/auth/forgot`, {
      email,
      message: createMessage(email),
    })
  },
  setNewPassword: (data: SetNewPasswordType) => {
    return instanceRec.post<SetNewPasswordType, AxiosResponse<{ info: string; error: string }>>(
      `/auth/set-new-password`,
      data
    )
  },

  blockUser: (data: BlockUserType) => {
    return instance.post(`/auth/block`, data)
  },
}
