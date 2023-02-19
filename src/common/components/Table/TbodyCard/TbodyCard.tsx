import React, { memo, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import {
  setChangedItemAnswer,
  setChangedItemCardsId,
  setChangedItemId,
  setChangedItemName,
  setModal,
} from '../../../../app/appSlice'
import Delete from '../../../../assets/Delete.svg'
import edit from '../../../../assets/Edit.svg'
import { updateCardTC } from '../../../../features/cards/cardSlice'
import { CardType } from '../../../../features/cards/cardType'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { dateHandler } from '../../../utils'
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

  const onClickDeleteHandler = (cardID: string, cardsPackID: string, cardName: string) => {
    // dispatch(deleteCardTC([cardID, cardsPackID]))
    dispatch(setModal('deleteCard'))
    dispatch(setChangedItemName(cardName))
    dispatch(setChangedItemId(cardID))
  }
  const onClickUpdateHandler = (
    cardID: string,
    cardsPackID: string,
    cardQuestion: string,
    cardAnswer: string
  ) => {
    dispatch(setModal('updateCard'))
    dispatch(setChangedItemId(cardID))
    dispatch(setChangedItemName(cardQuestion))
    dispatch(setChangedItemAnswer(cardAnswer))
    dispatch(setChangedItemCardsId(cardsPackID))
    /*let updateCard = {
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

    dispatch(updateCardTC(data))*/
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
                    onClick={() =>
                      onClickUpdateHandler(t._id, t.cardsPack_id, t.question, t.answer)
                    }
                    src={edit}
                    alt="edit"
                  />
                  <img
                    className={s.icon}
                    onClick={() => onClickDeleteHandler(t._id, t.cardsPack_id, t.question)}
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
