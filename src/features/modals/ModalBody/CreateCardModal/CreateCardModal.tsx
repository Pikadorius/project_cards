import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react'

import ModalButtons from '../../ModalButtons/ModalButtons'

import s from './CreateCardModal.module.scss'

import { InputModal } from 'common/components/InputModal/InputModal'
import { InputTypeFile } from 'common/components/InputTypeFile/InputTypeFile'
import { OptionsType, SelectModal } from 'common/components/SelectModal/SelectModal'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { resetModalValues } from 'common/utils'
import { createCardTC, updateCardTC } from 'features/cards/cardSlice'

type CreateModalType = {
  type: 'create' | 'update'
}

const CreateCardModal: FC<CreateModalType> = ({ type }) => {
  const options: OptionsType[] = ['Text', 'Picture']

  const dispatch = useAppDispatch()
  const changedCard = useAppSelector(state => state.modal.card)
  const cardsPackId = useAppSelector(state => state.modal.pack._id)

  const [selectQuestion, setSelectQuestion] = useState<'Text' | 'Picture'>(
    changedCard.questionImg ? 'Picture' : 'Text'
  )
  const [selectAnswer, setSelectAnswer] = useState<'Text' | 'Picture'>(
    changedCard.answerImg ? 'Picture' : 'Text'
  )
  const [cardQuestion, setCardQuestion] = useState(
    selectQuestion === 'Text' ? changedCard.question : ''
  )
  const [cardAnswer, setCardAnswer] = useState(selectAnswer === 'Text' ? changedCard.answer : '')
  const [questionImg, setQuestionImg] = useState(
    selectQuestion === 'Text' ? '' : changedCard.questionImg
  )
  const [answerImg, setAnswerImg] = useState(selectAnswer === 'Text' ? '' : changedCard.answerImg)

  useEffect(() => {
    setQuestionImg(selectQuestion === 'Text' ? '' : changedCard.questionImg)
    setAnswerImg(selectAnswer === 'Text' ? '' : changedCard.answerImg)
  }, [selectAnswer, selectQuestion])

  const onChangeCardQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setCardQuestion(e.currentTarget.value)
  }
  const onChangeCardAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setCardAnswer(e.currentTarget.value)
  }

  console.log(cardsPackId, cardQuestion, cardAnswer, questionImg, answerImg)

  const onClickHandler = () => {
    type === 'create'
      ? dispatch(
          createCardTC({
            card: {
              cardsPack_id: cardsPackId,
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
                _id: changedCard._id,
                question: cardQuestion,
                answer: cardAnswer,
                questionImg: questionImg,
                answerImg: answerImg,
              },
            },
            cardsPackID: cardsPackId,
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
          selectValue={selectQuestion}
          options={options}
          onChange={setSelectQuestion}
        />
      </div>
      {selectQuestion === 'Text' ? (
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
      ) : (
        <div className={s.description}>
          <InputTypeFile
            label={'Question'}
            callback={setQuestionImg}
            defaultFile={changedCard.questionImg}
          />
        </div>
      )}

      <div className={s.description}>
        <SelectModal
          label={'Choose a answer format'}
          selectValue={selectAnswer}
          options={options}
          onChange={setSelectAnswer}
        />
      </div>
      {selectAnswer === 'Text' ? (
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
      ) : (
        <div className={s.description}>
          <InputTypeFile
            label={'Answer'}
            callback={setAnswerImg}
            defaultFile={changedCard.answerImg}
          />
        </div>
      )}

      <ModalButtons
        onSuccess={onClickHandler}
        successBtnName={type === 'create' ? 'Add' : 'Save'}
      />
    </div>
  )
}

export default CreateCardModal
