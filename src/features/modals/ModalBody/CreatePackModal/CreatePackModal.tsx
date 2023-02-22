import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

import { InputModal } from '../../../../common/components/InputModal/InputModal'
import ModalButtons from '../../ModalButtons/ModalButtons'

import s from './CreatePackModal.module.scss'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { resetModalValues } from 'common/utils'
import { modalItemIdSelector, modalItemNameSelector } from 'features/modals/modalSelectors'
import { createPackTC, updatePackTC } from 'features/packs/packsSlice'

type CreateModalType = {
  type: 'create' | 'update'
}
const CreatePackModal: FC<CreateModalType> = ({ type }) => {
  const dispatch = useAppDispatch()
  const changedItemName = useAppSelector(modalItemNameSelector)
  const changedItemId = useAppSelector(modalItemIdSelector)
  const [packName, setPackName] = useState(changedItemName || 'New pack')

  const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
    console.log(packName)
  }

  const onClickHandler = () => {
    type === 'create'
      ? dispatch(createPackTC({ cardsPack: { name: packName } }))
      : dispatch(
          updatePackTC({
            cardsPack: {
              name: packName,
              _id: changedItemId,
            },
          })
        )
    resetModalValues(dispatch)
  }

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickHandler()
    }
  }

  const resetName = () => {
    setPackName('')
  }

  return (
    <div>
      <div className={s.description}>
        <InputModal
          label={'Pack name'}
          placeholder={'Pack name'}
          onKeyDown={onEnterHandler}
          value={packName}
          onChange={onChangePackName}
          reset={resetName}
        />
      </div>
      <ModalButtons
        onSuccess={onClickHandler}
        successBtnName={type === 'create' ? 'Add' : 'Save'}
      />
    </div>
  )
}

export default CreatePackModal
