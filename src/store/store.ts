import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from '../app/appSlice'
import { loadState, saveState } from '../common/utils/localStorage'
import { authReducer } from '../featuries/auth/authSlice'
import { cardReducer } from '../featuries/card/cardSlice'
import packsReducer from '../featuries/packs/packsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    packs: packsReducer,
    card: cardReducer,
  },
  preloadedState: loadState(),
})

store.subscribe(() => {
  saveState(store.getState())
})

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch
//
// export type AppStateType = ReturnType<typeof store.getState>
// export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

// export default store
