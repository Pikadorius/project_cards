import { RootStateType } from '../hooks/useAppSelector'

//auth selectors
export const getIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn

export const getIsRegistred = (state: RootStateType) => state.auth.isRegistered

export const getIsMessageSend = (state: RootStateType) => state.auth.isMessageSend

export const getIsPasswordChanged = (state: RootStateType) => state.auth.isPasswordChanged

export const getRecoveryEmail = (state: RootStateType) => state.auth.emailInRecovery

//app status, error, initialized
export const getAppStatus = (state: RootStateType) => state.app.appStatus

export const getIsInitialized = (state: RootStateType) => state.app.isInitialized

export const getAppError = (state: RootStateType) => state.app.appError

// packs

export const getPackSearchParams = (state: RootStateType) => {
  console.log('loading params')

  return state.packs.searchParams
}
