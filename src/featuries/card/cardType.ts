import { PackType } from '../packs/packsType'

export type InititalStateCardType = {
  cards: CardType[]
  searchParams: SearchParamsCardType
}

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type SearchParamsCardType = {
  cardAnswer: string
  cardQuestion: string
  cardsPack_id: string
  min: number
  max: number
  sortCards: string
  page: number
  pageCount: number
}

export type GetCardResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}
/*

export type GetPacksResponseType = {
  cardPacks: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type CreatePackType = {
  name?: string // если не отправить будет таким
  deckCover?: string // не обязателен
  private?: boolean
}

export type CreatePackRequestType = {
  cardsPack: CreatePackType
}
*/
