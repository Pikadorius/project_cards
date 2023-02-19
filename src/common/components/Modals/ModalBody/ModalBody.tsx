import React, { FC } from 'react'

import { ModalType } from '../../../../app/appSlice'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

import CreatePackModal from './CreatePackModal/CreatePackModal'
import DeleteModal from './DeleteModal/DeleteModal'

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
    default:
      return <></>
  }
}

export default ModalBody
