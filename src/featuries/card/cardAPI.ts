import { AxiosResponse } from 'axios'

import { instance } from '../../common/constans/instance'

import {
  CreateCardRequestType,
  CreateCardType,
  GetCardResponseType,
  SearchParamsCardType,
} from './cardType'

export const cardAPI = {
  getCard: (params: SearchParamsCardType, cardsPackID: string) => {
    return instance.get<'', AxiosResponse<GetCardResponseType>, SearchParamsCardType>(
      'cards/card',
      {
        params: {
          cardAnswer: params.cardAnswer,
          cardQuestion: params.cardQuestion,
          cardsPack_id: cardsPackID,
          min: params.min,
          max: params.max,
          sortCards: params.sortCards,
          page: params.page,
          pageCount: params.pageCount,
        },
      }
    )
  },
  createCard: (data: CreateCardRequestType) => {
    return instance.post<'', AxiosResponse<GetCardResponseType>, CreateCardRequestType>(
      'cards/card',
      data
    )
  },
  deleteCard: (cardID: string) => {
    return instance.delete<AxiosResponse<GetCardResponseType>>(`cards/card/?id=${cardID}`)
  },
  updateCard: (data: { card: Omit<CreateCardType, 'cardsPack_id'> & { _id: string } }) => {
    return instance.put<
      '',
      AxiosResponse<GetCardResponseType>,
      { card: Omit<CreateCardType, 'cardsPack_id'> & { _id: string } }
    >('cards/card', data)
  },
}
