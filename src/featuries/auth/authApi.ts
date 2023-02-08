import { instance, instanceRec } from "../../common/constans/instance";
import { AxiosResponse } from "axios";
import { PATH } from "../../common/constans/path";
import { FieldValues } from "react-hook-form";

export type ResponseType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
};

export type RegistrationRequestType = {
  email: string;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
  rememberMe: string;
};

export type SetNewPasswordType = {
  password: string;
  resetPasswordToken: string | undefined;
};

export type UpdateUserType = {
  name: string;
  avatar?: string;
};

export const authApi = {
  authMe: () => {
    return instance.post<{}, AxiosResponse<ResponseType>>(`auth/me`);
  },
  update: (data: UpdateUserType) =>
    instance.put<{}, AxiosResponse<{ updatedUser: ResponseType }>>(
      `auth/me`,
      data
    ),
  loggedIn: (data: FieldValues) => {
    return instance.post<{}, AxiosResponse>(`auth/login`, data);
  },
  logout: () => instance.delete<{}, AxiosResponse<{ info: string }>>(`auth/me`),
  register: (data: RegistrationRequestType) =>
    instance.post(`auth/register`, data),
  recoveryPassword: (email: string) => {
    const message = `<div style=padding: "15px">
            <div>Hi, ${email}!</div>
            <div>There was a request to change your password!</div>
            <div>If you did not make this request then please ignore this email.</div>
            <div>Otherwise, please click this link to change your password: 
            <a href='http://localhost:3000/#${PATH.NEW_PASSWORD}/$token$'>[link] </a></div>
            </div>`;

    return instanceRec.post<{}, AxiosResponse<{ info: string; error: string }>>(
      `/auth/forgot`,
      {
        email,
        message: message,
      }
    );
  },
  setNewPassword: (data: SetNewPasswordType) => {
    return instanceRec.post<{}, AxiosResponse<{ info: string; error: string }>>(
      `/auth/set-new-password`,
      data
    );
  },
};
