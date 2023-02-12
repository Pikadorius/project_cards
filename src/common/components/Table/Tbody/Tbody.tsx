import React from 'react'

import { PackType } from '../../../../featuries/packs/packsType'
import { useAppSelector } from '../../../hooks/AppSelector'
import { userNameHandler } from '../../../utils/userNameHandler'

import teacher from './../../../../assets/teacher.svg'
import s from './Tbody.module.scss'

type TbodyType = {
  packs?: PackType[]
}

export const Tbody: React.FC<TbodyType> = ({ packs }) => {
  const userId = useAppSelector(state => state.auth.user._id)

  return (
    <tbody>
      {packs?.map(t => {
        const dateUpdate = t.updated.toString()
        const userName = userNameHandler(t.user_name)

        return (
          <tr key={t._id} className={s.tr}>
            <td className={s.td}>{t.name}</td>
            <td className={s.td}>{t.cardsCount}</td>
            <td className={s.td}>{dateUpdate}</td>
            <td className={s.td}>{userName}</td>
            <td className={s.td}>
              {t.user_id === userId ? 1 : <img src={teacher} alt="learn pack" />}
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}
