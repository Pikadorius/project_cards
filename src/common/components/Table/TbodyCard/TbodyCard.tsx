import React from 'react'

import { useNavigate } from 'react-router-dom'

import { CardType } from '../../../../featuries/card/cardType'
import { useAppSelector } from '../../../hooks/AppSelector'
import { userNameHandler } from '../../../utils/userNameHandler'

import s from './TbodyCard.module.scss'

type TbodyType = {
  card?: CardType[]
}

export const TbodyCard: React.FC<TbodyType> = ({ card }) => {
  const userId = useAppSelector(state => state.auth.user._id)
  const navigate = useNavigate()

  return (
    <tbody>
      {card?.map(t => {
        // const getCardsPack = () => {
        //   return navigate(`${PATH.CARD_LIST}/${t._id}`)
        // }

        return (
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
