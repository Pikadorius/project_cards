import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

type InitialStateType = {
  isLoggedIn: boolean;
};

export const authMeTC = createAsyncThunk(
  "isLoggedIn",
  async (_, { dispatch }) => {
    const res = await authApi.authMe();
    try {
      dispatch(isLoggedIn(true));
    } catch (e: any) {}
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  } as InitialStateType,
  reducers: {
    isLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

const { isLoggedIn } = authSlice.actions;
export const authReducer = authSlice.reducer;
