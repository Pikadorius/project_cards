import { RootStateType } from '../hooks/AppSelector'

//auth selectors
export const getIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn

export const getIsRegistred = (state: RootStateType) => state.auth.isRegistred
