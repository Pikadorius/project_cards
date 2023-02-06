import { instance } from "../../common/constans/instance";
import axios, { AxiosResponse } from "axios";

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

export type UpdateType = {
  name: string;
  avatar: string;
};

export type RecoveryPasswordRequestType = {
  email: string;
  from: string;
  message: string;
};

export const authApi = {
  authMe: () => {
    return instance.post<{}, AxiosResponse<ResponseType>>(`auth/me`);
  },
  update: (data: UpdateType) => instance.put(`auth/login`),
  loggedIn: (data: LoginType) => {
    return instance.post(`auth/login`, data);
  },
  logout: () => instance.delete<AxiosResponse<{ info: string }>>(`auth/me`),
  register: (data: RegistrationRequestType) =>
    instance.post(`auth/register`, data),
  recoveryPassword: (data: RecoveryPasswordRequestType) => {
    return instance.post<AxiosResponse<{ info: string; error: string }>>(
      `/auth/forgot`,
      data
    );
  },
};
