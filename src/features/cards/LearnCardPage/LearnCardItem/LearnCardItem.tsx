import React, { memo } from 'react'

import { Button } from '../../../../common/components/Button/Button'
import { CardType } from '../../cardType'
import s from '../LearnCardItem/LearnCardItem.module.scss'
import { AnswerStatuses } from '../learnCardSlice'

import { GradesItem } from './GradesItem/GradesItem'

type FormWrapperType = {
  card: CardType
  title: string
  isChecked: boolean
  onChangeChecked: (isActive: AnswerStatuses, grade: number) => void
  onNext: () => void
  onShowAnswer: () => void
}

export const LearnCardItem = memo(
  ({ card, title, isChecked, onChangeChecked, onNext, onShowAnswer }: FormWrapperType) => {
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.innerWrapper}>
            <h3 className={s.title}>{title}</h3>
            <div>Question: {card.question}</div>
            <div>Number of attempts to answer the question: {card.shots}</div>
            {!isChecked && (
              <div>
                <div>Answer: {card.answer}</div>
                <GradesItem onChangeChecked={onChangeChecked} />
                <Button title={'Next'} callBack={onNext} isValid={true} />
              </div>
            )}
            {isChecked && <Button title={'Show answer'} callBack={onShowAnswer} isValid={true} />}
          </div>
        </div>
      </div>
    )
  }
)
