import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

import ModalButtons from '../../ModalButtons/ModalButtons'

import s from './CreatePackModal.module.scss'

import CustomCheckbox from 'common/components/CustomCheckbox/CustomCheckbox'
import { InputModal } from 'common/components/InputModal/InputModal'
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
  const [isPrivate, setPrivate] = useState(false)

  const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
    console.log(packName)
  }

  const privateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivate(e.currentTarget.checked)
  }

  const onClickHandler = () => {
    type === 'create'
      ? dispatch(createPackTC({ cardsPack: { name: packName, private: isPrivate } }))
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
        <div>
          <InputModal
            label={'Pack name'}
            placeholder={'Pack name'}
            onKeyDown={onEnterHandler}
            value={packName}
            onChange={onChangePackName}
            reset={resetName}
            focus={true}
          />
        </div>
        <CustomCheckbox checked={isPrivate} onChange={setPrivate} title={'Private pack'} />
      </div>

      <ModalButtons
        onSuccess={onClickHandler}
        successBtnName={type === 'create' ? 'Add' : 'Save'}
      />
    </div>
  )
}

export default CreatePackModal
