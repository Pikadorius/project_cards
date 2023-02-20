import React, { memo, useCallback, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import arrow from '../../../assets/arrow.svg'
import { useAppDispatch, useAppSelector } from '../../../common/hooks'
import { cardSelector, packNameCardSelector } from '../CardList/cardSelectors'
import { fetchCardTC, updatedGradeTC } from '../cardSlice'
import { CardType } from '../cardType'
import s from '../LearnCardPage/LearnCardPage.module.scss'

import { LearnCardItem } from './LearnCardItem/LearnCardItem'
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

  const onNext = useCallback(() => {
    setIsChecked(true)
    dispatch(updatedGradeTC({ grade: grade, card_id: card._id }))
    dispatch(resetStatus())
    if (cards.length > 0) {
      setCard(getCard(cards))
    }
  }, [])

  const onChangeChecked = useCallback((isActive: AnswerStatuses, grade: number) => {
    dispatch(changeStatus({ id: grade, status: isActive }))
    setGrade(grade)
  }, [])

  const onShowAnswer = useCallback(() => {
    setIsChecked(false)
  }, [])

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <div onClick={() => navigate(-1)} className={s.linkBackward}>
            <img className={s.arrow} src={arrow} alt="arrow backward" />
            <span className={s.backwardText}>Back to Packs List</span>
          </div>
          <LearnCardItem
            title={packName}
            card={card}
            isChecked={isChecked}
            onChangeChecked={onChangeChecked}
            onNext={onNext}
            onShowAnswer={onShowAnswer}
          />
        </div>
      </div>
    </div>
  )
})
