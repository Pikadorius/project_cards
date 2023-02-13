export type PacksQueryParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPack?: string
  page?: number
  pageCount?: number
  user_id?: string
}

export type PackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string
  cardsCount: number
  type: string
  rating: number
  created: Date
  updated: Date
  more_id: string
  __v: number
}

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
