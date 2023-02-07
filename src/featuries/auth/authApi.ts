import { instance, instanceRec } from "../../common/constans/instance";
import { AxiosResponse } from "axios";
import { PATH } from "../../common/constans/path";

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
  loggedIn: (data: LoginType) => {
    return instance.post<{}, AxiosResponse>(`auth/login`, data);
  },
  logout: () => instance.delete<{}, AxiosResponse<{ info: string }>>(`auth/me`),
  register: (data: RegistrationRequestType) =>
    instance.post(`auth/register`, data),
  recoveryPassword: (email: string) => {
    return instanceRec.post<{}, AxiosResponse<{ info: string; error: string }>>(
      `/auth/forgot`,
      {
        email,
        message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/#${PATH.NEW_PASSWORD}/$token$'>link</a></div>`,
      }
      //путь href
    );
  },
};
