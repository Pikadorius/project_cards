import { instance } from '../../common/constans/instance'

import { GetPacksResponseType, PacksQueryParamsType } from './packsType'

export const packsAPI = {
  getPacks: (params: PacksQueryParamsType = {}) => {
    return instance.get<GetPacksResponseType>('cards/pack', { params })
  },
}
