import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { store } from '../../store/store'

export type RootStateType = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
