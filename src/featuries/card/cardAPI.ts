import { AxiosResponse } from 'axios'

import { instance } from '../../common/constans/instance'

import { GetCardResponseType, SearchParamsCardType } from './cardType'

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
}
