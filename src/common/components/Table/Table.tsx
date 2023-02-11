import React from 'react'

import teacher from '../../../assets/teacher.svg'
import { PackType } from '../../../featuries/packs/packsType'
import { SortTitlePackListType } from '../../constans/sort'
import { userNameHandler } from '../../utils/userNameHandler'

import s from './Table.module.scss'
import { Thead } from './Thead/Thead'

type TableType = {
  sortTitlePackList: SortTitlePackListType
  packs: PackType[]
  userId: string
}

export const Table: React.FC<TableType> = ({ sortTitlePackList, packs, userId }) => {
  return (
    <div className={s.container}>
      <table className={s.table}>
        <Thead sortTitlePackList={sortTitlePackList} />
        <tbody>
          {packs.map(t => {
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
      </table>
    </div>
  )
}
