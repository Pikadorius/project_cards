import { instance } from '../../common/constans/instance'

import { SearchParamsType } from './packsSlice'
import { CreatePackRequestType, GetPacksResponseType } from './packsType'

export const packsAPI = {
  getPacks: (params: SearchParamsType) => {
    return instance.get<GetPacksResponseType>('cards/pack', { params })
  },
  createPack: (data: CreatePackRequestType) => {
    return instance.post('/cards/pack', data)
  },
}
