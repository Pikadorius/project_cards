import { RootStateType } from 'store/store'

export const cardsListSelector = (state: RootStateType) => state.app.cardList
export const cardSelector = (state: RootStateType) => state.card.cards
export const pageCardSelector = (state: RootStateType) => state.card.searchParams.page
export const pageCountCardSelector = (state: RootStateType) => state.card.searchParams.pageCount
export const pagesTotalCountCardSelector = (state: RootStateType) =>
  state.card.searchParams.totalPagesCount
export const cardQuestionCardSelector = (state: RootStateType) =>
  state.card.searchParams.cardQuestion
export const sortCardsSelector = (state: RootStateType) => state.card.searchParams.sortCards
export const cardsTotalCountSelector = (state: RootStateType) =>
  state.card.searchParams.cardsTotalCount
