import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi, LoginType, RegistrationRequestType } from "./authApi";
import { errorUtils } from "../../common/utils/ErrorHandler";
import { isInitialized, setAppError } from "../../app/appSlice";

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
    try {
      const res = await authApi.register(data);
      dispatch(isRegistred(true));
    } catch (e: any) {
      errorUtils(e, dispatch);
      dispatch(isRegistred(false));
    }
  }
);

export const loginTC = createAsyncThunk(
  "login",
  async (data: LoginType, { dispatch }) => {
    try {
      const res = await authApi.loggedIn(data);
      dispatch(isLoggedIn(true));
      dispatch(setUser(res.data));
    } catch (e: any) {}
  }
);

export const logoutTC = createAsyncThunk("logout", async (_, { dispatch }) => {
  try {
    const res = await authApi.logout();
    dispatch(isLoggedIn(false));
    dispatch(setAppError(res.data.data.info));
  } catch (e: any) {
    errorUtils(e, dispatch);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isRegistred: true,
    user: {},
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
  },
});

export const { isLoggedIn, isRegistred, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
