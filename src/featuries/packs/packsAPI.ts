import { instance } from '../../common/constans/instance'

import { GetPacksResponseType, PacksQueryParamsType } from './packsType'

export const packsAPI = {
  getPacks: (params: PacksQueryParamsType) =>
    instance.get<GetPacksResponseType>('cards/packs', { params }),
}
