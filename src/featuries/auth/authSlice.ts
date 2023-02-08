import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  authApi,
  LoginType,
  RegistrationRequestType,
  SetNewPasswordType,
} from "./authApi";
import { errorUtils } from "../../common/utils/errorHandler";
import { isInitialized, setAppError, setAppStatus } from "../../app/appSlice";

export type UserType = {
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

type InitialStateType = {
  isLoggedIn: boolean;
  isRegistred: boolean;
  user: UserType;
  emailInRecovery: string;
  isPasswordChanged: boolean;
  isMessageSend: boolean;
};

export const authMeTC = createAsyncThunk(
  "isLoggedIn",
  async (_, { dispatch }) => {
    dispatch(isInitialized(false));
    try {
      const res = await authApi.authMe();
      dispatch(isLoggedIn(true));
      dispatch(setUser(res.data));
    } catch (e: any) {
    } finally {
      dispatch(isInitialized(true));
    }
  }
);

export const registerTC = createAsyncThunk(
  "isRegistred",
  async (data: RegistrationRequestType, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const res = await authApi.register(data);
      dispatch(isRegistred(true));
      dispatch(setAppError("Account created"));
      dispatch(setAppStatus("success"));
    } catch (e: any) {
      errorUtils(e, dispatch);
      dispatch(isRegistred(false));
    }
  }
);

export const loginTC = createAsyncThunk(
  "login",
  async (data: LoginType, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const res = await authApi.loggedIn(data);
      dispatch(isLoggedIn(true));
      dispatch(setUser(res.data));
      dispatch(setAppStatus("success"));
    } catch (e: any) {
      errorUtils(e, dispatch);
    }
  }
);

export const logoutTC = createAsyncThunk("logout", async (_, { dispatch }) => {
  dispatch(setAppStatus("loading"));
  try {
    const res = await authApi.logout();
    dispatch(isLoggedIn(false));
    dispatch(setAppError(res.data.info));
    dispatch(setAppStatus("success"));
  } catch (e: any) {
    errorUtils(e, dispatch);
  }
});

export const recoveryTC = createAsyncThunk(
  "recovery",
  async (email: string, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const res = await authApi.recoveryPassword(email);
      dispatch(setEmailInRecovery(email));
      dispatch(setAppError("Message has been sent"));
      dispatch(isMessageSend(true));
      dispatch(setAppStatus("success"));
    } catch (e: any) {
      errorUtils(e, dispatch);
    }
  }
);

export const setNewPasswordTC = createAsyncThunk(
  "newPassword",
  async (data: SetNewPasswordType, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const res = await authApi.setNewPassword(data);
      dispatch(isPasswordChanged(true));
      dispatch(setAppError("Password changed"));
      dispatch(setAppStatus("success"));
    } catch (e: any) {
      errorUtils(e, dispatch);
    }
  }
);

export const updateNameTC = createAsyncThunk(
  "updateName",
  async (newName: string, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const res = await authApi.update({ name: newName });
      dispatch(updateUser(res.data.updatedUser.name));
      dispatch(setAppError("Name changed"));
      dispatch(setAppStatus("success"));
    } catch (e: any) {
      errorUtils(e, dispatch);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isRegistred: false,
    user: {},
    emailInRecovery: "",
    isPasswordChanged: false,
    isMessageSend: false,
  } as InitialStateType,
  reducers: {
    isLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    isRegistred: (state, action: PayloadAction<boolean>) => {
      state.isRegistred = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    // под вопросом (можно передавать false в isLoggedIn)
    logout: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setEmailInRecovery: (state, action: PayloadAction<string>) => {
      state.emailInRecovery = action.payload;
    },
    isMessageSend: (state, action: PayloadAction<boolean>) => {
      state.isMessageSend = action.payload;
    },
    isPasswordChanged: (state, action: PayloadAction<boolean>) => {
      state.isPasswordChanged = action.payload;
    },
    updateUser: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
  },
});

export const {
  isLoggedIn,
  isRegistred,
  setUser,
  isPasswordChanged,
  isMessageSend,
  setEmailInRecovery,
  updateUser,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
