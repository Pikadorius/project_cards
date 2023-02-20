import React, { memo, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import arrow from '../../../assets/arrow.svg'
import { useAppDispatch, useAppSelector } from '../../../common/hooks'
import s from '../CardList/CardList.module.scss'
import { cardSelector, packNameCardSelector } from '../CardList/cardSelectors'
import { fetchCardTC, updatedGradeTC } from '../cardSlice'
import { CardType } from '../cardType'

import { AnswerStatuses, changeStatus, resetStatus } from './learnCardSlice'

const getCard = (cards: any[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return cards[res.id + 1]
}

export const LearnCardPage = memo(() => {
  const [isChecked, setIsChecked] = useState<boolean>(true)
  const [grade, setGrade] = useState<number>(0)
  const [first, setFirst] = useState<boolean>(false)
  let { id } = useParams<{ id: string }>()

  const packName = useAppSelector(packNameCardSelector)
  const gradesCardLearn = useAppSelector(state => state.learnCard)
  const cards = useAppSelector(cardSelector)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [card, setCard] = useState<CardType>(cards[0])

  useEffect(() => {
    if (!id) return
    if (first) {
      dispatch(fetchCardTC(id))
      setFirst(false)
    }

    if (cards.length > 0) setCard(getCard(cards))

    return () => {}
  }, [dispatch, id, cards, first])

  const onNext = () => {
    setIsChecked(true)
    dispatch(updatedGradeTC({ grade: grade, card_id: card._id }))
    dispatch(resetStatus())
    if (cards.length > 0) {
      setCard(getCard(cards))
    }
  }

  const onChangeCheckedHandler = (isActive: AnswerStatuses, grade: number) => {
    dispatch(changeStatus({ id: grade, status: isActive }))
    setGrade(grade)
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <div onClick={() => navigate(-1)} className={s.linkBackward}>
            <img className={s.arrow} src={arrow} alt="arrow backward" />
            <span className={s.backwardText}>Back to Packs List</span>
          </div>
          <h3>{packName}</h3>
          <div>Question: {card.question}</div>
          <div>Number of attempts to answer the question: {card.shots}</div>
          {!isChecked && (
            <div>
              <div>Answer: {card.answer}</div>
              <div>
                <div>Rate yourself:</div>
                {gradesCardLearn.map((g, i) => {
                  return (
                    <div key={i}>
                      <input
                        type={'checkbox'}
                        checked={g.status === AnswerStatuses.IsActive}
                        onChange={e =>
                          onChangeCheckedHandler(
                            e.currentTarget.checked
                              ? AnswerStatuses.IsActive
                              : AnswerStatuses.IsNoActive,
                            g.id
                          )
                        }
                      />
                      {g.title}
                    </div>
                  )
                })}
              </div>
              <button onClick={onNext}>Next</button>
            </div>
          )}
          {isChecked && <button onClick={() => setIsChecked(false)}>Show answer</button>}
        </div>
      </div>
    </div>
  )
})
