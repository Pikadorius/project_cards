import { RootStateType } from '../common/hooks/useAppSelector'

export const appStatusSelector = (state: RootStateType) => state.app.appStatus

export const isInitializedSelector = (state: RootStateType) => state.app.isInitialized

export const appErrorSelector = (state: RootStateType) => state.app.appError
