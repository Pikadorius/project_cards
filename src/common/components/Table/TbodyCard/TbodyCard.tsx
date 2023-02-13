import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { deleteCardTC, fetchCardTC, updateCardTC } from '../../../../featuries/card/cardSlice'
import { CardType } from '../../../../featuries/card/cardType'
import { useAppDispatch } from '../../../hooks/AppDispatch'
import { useAppSelector } from '../../../hooks/AppSelector'
import { userNameHandler } from '../../../utils/userNameHandler'

import s from './TbodyCard.module.scss'

type TbodyType = {
  card?: CardType[]
}

export const TbodyCard: React.FC<TbodyType> = ({ card }) => {
  const userId = useAppSelector(state => state.auth.user._id)
  const packUserId = useAppSelector(state => state.card.searchParams.packUserId)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  let isMyCard = userId === packUserId

  const onClickDeleteHandler = (cardID: string, cardsPackID: string) => {
    dispatch(deleteCardTC([cardID, cardsPackID]))
  }
  const onClickUpdateHandler = (cardID: string, cardsPackID: string) => {
    let updateCard = {
      card: {
        _id: cardID,
        question: 'What do you buy?',
        answer: 'Bread',
        grade: 0,
        shots: 0,
        answerImg: 'url or base 64',
        questionImg: 'url or base 64',
        questionVideo: 'url or base 64',
        answerVideo: 'url or base 64',
      },
    }
    let data = { updateCard, cardsPackID }

    dispatch(updateCardTC(data))
  }

  useEffect(() => {
    console.log(userId === packUserId)
  }, [packUserId])

  return (
    <tbody>
      {card?.map(t => {
        return isMyCard ? (
          <tr key={t._id} className={s.tr}>
            <td className={s.td}>{t.question}</td>
            <td className={s.td}>{t.answer}</td>
            <td className={s.td}>{t.updated}</td>
            <td className={s.td}>{t.grade}</td>
            <td className={s.td} onClick={() => onClickUpdateHandler(t._id, t.cardsPack_id)}>
              up
            </td>
            <td className={s.td} onClick={() => onClickDeleteHandler(t._id, t.cardsPack_id)}>
              del
            </td>
          </tr>
        ) : (
          <tr key={t._id} className={s.tr}>
            <td className={s.td}>{t.question}</td>
            <td className={s.td}>{t.answer}</td>
            <td className={s.td}>{t.updated}</td>
            <td className={s.td}>{t.grade}</td>
          </tr>
        )
      })}
    </tbody>
  )
}
