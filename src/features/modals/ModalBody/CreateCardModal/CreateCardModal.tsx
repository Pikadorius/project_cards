import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

import ModalButtons from '../../ModalButtons/ModalButtons'

import s from './CreateCardModal.module.scss'

import { InputModal } from 'common/components/InputModal/InputModal'
import { InputTypeFile } from 'common/components/InputTypeFile/InputTypeFile'
import { SelectModal } from 'common/components/SelectModal/SelectModal'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { resetModalValues } from 'common/utils'
import { createCardTC, updateCardTC } from 'features/cards/cardSlice'
import {
  modalItemAnswerSelector,
  modalItemCardsIdSelector,
  modalItemIdSelector,
  modalItemNameSelector,
} from 'features/modals/modalSelectors'

type CreateModalType = {
  type: 'create' | 'update'
}

const CreateCardModal: FC<CreateModalType> = ({ type }) => {
  const [select, setSelect] = useState('Text')
  const options = ['Text', 'Picture']

  const dispatch = useAppDispatch()
  const changedItemQuestion = useAppSelector(modalItemNameSelector)
  const changedItemAnswer = useAppSelector(modalItemAnswerSelector)
  const changedItemId = useAppSelector(modalItemIdSelector)
  const changedItemCardsId = useAppSelector(modalItemCardsIdSelector)
  const [cardQuestion, setCardQuestion] = useState(changedItemQuestion)
  const [cardAnswer, setCardAnswer] = useState(changedItemAnswer)
  const [questionImg, setQuestionImg] = useState(changedItemQuestion)
  const [answerImg, setAnswerImg] = useState(changedItemAnswer)

  const onChangeCardQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setCardQuestion(e.currentTarget.value)
  }
  const onChangeCardAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setCardAnswer(e.currentTarget.value)
  }

  console.log(changedItemId, cardQuestion, cardAnswer, questionImg, answerImg)

  const onClickHandler = () => {
    type === 'create'
      ? dispatch(
          createCardTC({
            card: {
              cardsPack_id: changedItemId,
              question: cardQuestion,
              answer: cardAnswer,
              questionImg: questionImg,
              answerImg: answerImg,
            },
          })
        )
      : dispatch(
          updateCardTC({
            updateCard: {
              card: {
                _id: changedItemId,
                question: cardQuestion,
                answer: cardAnswer,
                questionImg: questionImg,
                answerImg: answerImg,
              },
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

  const resetCardQuestion = () => {
    setCardQuestion('')
  }

  const resetCardAnswer = () => {
    setCardAnswer('')
  }

  return (
    <div className={s.container}>
      <div className={s.description}>
        <SelectModal
          label={'Choose a question format'}
          selectValue={select}
          options={options}
          onChange={setSelect}
        />
      </div>
      {select === 'Text' ? (
        <>
          <div className={s.description}>
            <InputModal
              label={'Question'}
              placeholder={'Question'}
              onKeyDown={onEnterHandler}
              value={cardQuestion}
              onChange={onChangeCardQuestion}
              reset={resetCardQuestion}
              focus={true}
            />
          </div>
          <div className={s.description}>
            <InputModal
              label={'Answer'}
              placeholder={'Answer'}
              onKeyDown={onEnterHandler}
              value={cardAnswer}
              onChange={onChangeCardAnswer}
              reset={resetCardAnswer}
            />
          </div>
        </>
      ) : (
        <>
          <div className={s.description}>
            <InputTypeFile label={'Question'} callback={setQuestionImg} />
          </div>
          <div className={s.description}>
            <InputTypeFile label={'Answer'} callback={setAnswerImg} />
          </div>
        </>
      )}

      <ModalButtons
        onSuccess={onClickHandler}
        successBtnName={type === 'create' ? 'Add' : 'Save'}
      />
    </div>
  )
}

export default CreateCardModal
