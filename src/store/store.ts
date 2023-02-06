import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../featuries/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch
//
// export type AppStateType = ReturnType<typeof store.getState>
// export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

// export default store
