import { RootStateType } from '../../common/hooks/useAppSelector'

export const isLoggedInSelector = (state: RootStateType) => state.auth.isLoggedIn

export const isRegisteredSelector = (state: RootStateType) => state.auth.isRegistered

export const isMessageSendSelector = (state: RootStateType) => state.auth.isMessageSend

export const isPasswordChangedSelector = (state: RootStateType) => state.auth.isPasswordChanged

export const getRecoveryEmailSelector = (state: RootStateType) => state.auth.emailInRecovery
