import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  appError: string | null;
  isInitialized: boolean;
};

const initialState: InitialStateType = {
  appError: null,
  isInitialized: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<string | null>) => {
      state.appError = action.payload;
    },
    isInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { setAppError, isInitialized } = appSlice.actions;

export const appReducer = appSlice.reducer;
