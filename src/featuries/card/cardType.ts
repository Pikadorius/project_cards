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
  packName: string
  packUserId: string
}

export type GetCardResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packCreated: string
  packDeckCover: string
  packUserId: string
  packName: string
  packPrivate: string
  packUpdated: string
  token: string
  tokenDeathTime: string
}
