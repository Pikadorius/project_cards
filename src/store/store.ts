import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from '../app/appSlice'
import { authReducer } from '../featuries/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
  },
})

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch
//
// export type AppStateType = ReturnType<typeof store.getState>
// export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

// export default store
