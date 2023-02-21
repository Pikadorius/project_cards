import React, { FC } from 'react'

import ModalWrapper from '../ModalWrapper/ModalWrapper'

import CreateCardModal from './CreateCardModal/CreateCardModal'
import CreatePackModal from './CreatePackModal/CreatePackModal'
import DeleteModal from './DeleteModal/DeleteModal'

import { ModalType } from 'app/appSlice'

type PacksModalT = {
  modalType: ModalType
}
const ModalBody: FC<PacksModalT> = ({ modalType }) => {
  switch (modalType) {
    case 'createPack':
      return (
        <ModalWrapper title={'Add new pack'}>
          <CreatePackModal type={'create'} />
        </ModalWrapper>
      )
    case 'deletePack':
      return (
        <ModalWrapper title={'Delete pack'}>
          <DeleteModal type={'pack'} />
        </ModalWrapper>
      )
    case 'updatePack':
      return (
        <ModalWrapper title={'Edit pack'}>
          <CreatePackModal type={'update'} />
        </ModalWrapper>
      )
    case 'deleteCard':
      return (
        <ModalWrapper title={'Delete card'}>
          <DeleteModal type={'card'} />
        </ModalWrapper>
      )
    case 'createCard':
      return (
        <ModalWrapper title={'Create card'}>
          <CreateCardModal type={'create'} />
        </ModalWrapper>
      )
    case 'updateCard':
      return (
        <ModalWrapper title={'Edit card'}>
          <CreateCardModal type={'update'} />
        </ModalWrapper>
      )
    default:
      return <></>
  }
}

export default ModalBody
