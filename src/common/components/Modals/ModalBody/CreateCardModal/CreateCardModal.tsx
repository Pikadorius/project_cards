import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

import BackspaceIcon from '@mui/icons-material/Backspace'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import ModalButtons from '../../ModalButtons/ModalButtons'

import s from './CreateCardModal.module.scss'

import {
  modalItemAnswerSelector,
  modalItemCardsIdSelector,
  modalItemIdSelector,
  modalItemNameSelector,
} from 'app/appSelectors'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { resetModalValues } from 'common/utils'
import { createCardTC, updateCardTC } from 'features/cards/cardSlice'

type CreateModalType = {
  type: 'create' | 'update'
}
const CreateCardModal: FC<CreateModalType> = ({ type }) => {
  const dispatch = useAppDispatch()
  const changedItemQuestion = useAppSelector(modalItemNameSelector)
  const changedItemAnswer = useAppSelector(modalItemAnswerSelector)
  const changedItemId = useAppSelector(modalItemIdSelector)
  const changedItemCardsId = useAppSelector(modalItemCardsIdSelector)
  const [cardQuestion, setCardQuestion] = useState(changedItemQuestion || 'Question')
  const [cardAnswer, setCardAnswer] = useState(changedItemAnswer || 'Answer')

  const onChangeCardQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setCardQuestion(e.currentTarget.value)
  }
  const onChangeCardAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setCardAnswer(e.currentTarget.value)
  }

  const onClickHandler = () => {
    type === 'create'
      ? dispatch(
          createCardTC({
            card: { cardsPack_id: changedItemId, question: cardQuestion, answer: cardAnswer },
          })
        )
      : dispatch(
          updateCardTC({
            updateCard: {
              card: { _id: changedItemId, question: cardQuestion, answer: cardAnswer },
            },
            cardsPackID: changedItemCardsId,
          })
        )
    resetModalValues(dispatch)
  }

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickHandler()
    }
  }

  const resetCardQuetion = () => {
    setCardQuestion('')
  }

  const resetCardAnswer = () => {
    setCardAnswer('')
  }

  return (
    <div>
      <div className={s.description}>
        <TextField
          fullWidth
          label="Question"
          variant="standard"
          autoFocus
          onKeyDown={onEnterHandler}
          value={cardQuestion}
          onChange={onChangeCardQuestion}
        />
        <IconButton onClick={resetCardQuetion}>
          <BackspaceIcon fontSize={'small'} />
        </IconButton>
      </div>
      <div className={s.description}>
        <TextField
          fullWidth
          label="Answer"
          variant="standard"
          onKeyDown={onEnterHandler}
          value={cardAnswer}
          onChange={onChangeCardAnswer}
        />
        <IconButton onClick={resetCardAnswer}>
          <BackspaceIcon fontSize={'small'} />
        </IconButton>
      </div>
      <ModalButtons
        onSuccess={onClickHandler}
        successBtnName={type === 'create' ? 'Add' : 'Save'}
      />
    </div>
  )
}

export default CreateCardModal
