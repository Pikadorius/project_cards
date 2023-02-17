import { RootStateType } from '../../store/store'

export const packsListSelector = (state: RootStateType) => state.app.packList
export const packsSelector = (state: RootStateType) => state.packs.cardPacks
export const packsCountOnPageSelector = (state: RootStateType) => state.packs.searchParams.pageCount
export const packsPageCountSelector = (state: RootStateType) =>
  state.packs.searchParams.totalPagesCount
export const packsPageSelector = (state: RootStateType) => state.packs.searchParams.page
export const packsMinSelector = (state: RootStateType) => state.packs.searchParams.min
export const packsMaxSelector = (state: RootStateType) => state.packs.searchParams.max
export const packNameSelector = (state: RootStateType) => state.packs.searchParams.packName
export const packSortSelector = (state: RootStateType) => state.packs.searchParams.sortPack
export const packByUserSelector = (state: RootStateType) => state.packs.searchParams.user_id
