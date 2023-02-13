import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { fetchCardTC } from '../../../../featuries/card/cardSlice'
import { CardType } from '../../../../featuries/card/cardType'
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

  let isMyCard = userId === packUserId

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
            <td className={s.td}>up</td>
            <td className={s.td}>del</td>
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
