import React, { FC } from 'react'

import { ModalType } from '../../../../app/appSlice'
import CreatePackModal from '../CreatePackModal/CreatePackModal'
import DeleteModal from '../DeleteModal/DeleteModal'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import UpdatePackModal from '../UpdatePackModal/UpdatePackModal'

type PacksModalT = {
  modalType: ModalType
}
const PacksModals: FC<PacksModalT> = ({ modalType }) => {
  switch (modalType) {
    case 'createPack':
      return (
        <ModalWrapper title={'Add new pack'}>
          <CreatePackModal />
        </ModalWrapper>
      )
    case 'deletePack':
      return (
        <ModalWrapper title={'Delete pack'}>
          <DeleteModal />
        </ModalWrapper>
      )
    case 'updatePack':
      return (
        <ModalWrapper title={'Edit pack'}>
          <UpdatePackModal />
        </ModalWrapper>
      )
    default:
      return <div>LOL</div>
  }
}

export default PacksModals
