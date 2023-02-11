import { instance } from '../../common/constans/instance'

import { CreatePackRequestType, GetPacksResponseType, PacksQueryParamsType } from './packsType'

export const packsAPI = {
  getPacks: (params: PacksQueryParamsType = {}) => {
    return instance.get<GetPacksResponseType>('cards/pack', { params })
  },
  createPack: (data: CreatePackRequestType) => {
    return instance.post('/cards/pack', data)
  },
}
