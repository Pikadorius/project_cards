import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from 'app/appSlice'
import { loadState, saveState } from 'common/utils'
import { authReducer } from 'features/auth/authSlice'
import { cardReducer } from 'features/cards/cardSlice'
import packsReducer from 'features/packs/packsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    packs: packsReducer,
    card: cardReducer,
  },
  preloadedState: loadState(),
})

export type RootStateType = ReturnType<typeof store.getState>

store.subscribe(() => {
  saveState(store.getState())
})

// export type UseAppDispatch = typeof store.dispatch
// export const useAppDispatch: () => UseAppDispatch = useDispatch
//
// export type AppStateType = ReturnType<typeof store.getState>
// export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

// export default store
