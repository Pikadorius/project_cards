import React, { memo, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import Delete from '../../../../assets/Delete.svg'
import edit from '../../../../assets/Edit.svg'
import { CardType } from '../../../../features/cards/cardType'
import { dateHandler } from '../../../utils'
import { CardsRating } from '../../Rating/Rating'

import s from './TbodyCard.module.scss'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import {
  setChangedItemAnswer,
  setChangedItemCardsId,
  setChangedItemId,
  setChangedItemName,
  setModal,
} from 'features/modals/modalSlice'

type TbodyType = {
  card?: CardType[]
}

export const TbodyCard: React.FC<TbodyType> = memo(({ card }) => {
  const userId = useAppSelector(state => state.auth.user._id)
  const packUserId = useAppSelector(state => state.card.searchParams.packUserId)
  const dispatch = useAppDispatch()

  let isMyCard = userId === packUserId

  const onClickDeleteHandler = (cardID: string, cardsPackID: string, cardName: string) => {
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
