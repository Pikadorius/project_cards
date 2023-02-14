import React, { memo, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import Delete from '../../../../assets/Delete.svg'
import edit from '../../../../assets/Edit.svg'
import { deleteCardTC, updateCardTC } from '../../../../featuries/card/cardSlice'
import { CardType } from '../../../../featuries/card/cardType'
import { useAppDispatch } from '../../../hooks/AppDispatch'
import { useAppSelector } from '../../../hooks/AppSelector'
import { dateHandler } from '../../../utils/dateHandler'
import { CardsRating } from '../../Rating/Rating'

import s from './TbodyCard.module.scss'

type TbodyType = {
  card?: CardType[]
}

export const TbodyCard: React.FC<TbodyType> = memo(({ card }) => {
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
        question: 'Updated',
        answer: '....',
        grade: 0,
        shots: 6,
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
        const update = dateHandler(t.updated)

        return isMyCard ? (
          <tr key={t._id} className={s.tr}>
            <td className={s.td}>{t.question}</td>
            <td className={s.td}>{t.answer}</td>
            <td className={s.td}>{update}</td>
            <td className={s.td}>
              <div className={s.gradeColumn}>
                <div className={s.grade}>
                  <CardsRating value={t.grade} />
                </div>
                <div className={s.iconContainer}>
                  <img
                    className={s.icon}
                    onClick={() => onClickUpdateHandler(t._id, t.cardsPack_id)}
                    src={edit}
                    alt="edit"
                  />
                  <img
                    className={s.icon}
                    onClick={() => onClickDeleteHandler(t._id, t.cardsPack_id)}
                    src={Delete}
                    alt="delete"
                  />
                </div>
              </div>
            </td>
          </tr>
        ) : (
          <tr key={t._id} className={s.tr}>
            <td className={s.td}>{t.question}</td>
            <td className={s.td}>{t.answer}</td>
            <td className={s.td}>{update}</td>
            <td className={s.td}>
              <CardsRating value={t.grade} />
            </td>
          </tr>
        )
      })}
    </tbody>
  )
})
