import React from 'react'

import { PackType } from '../../../featuries/packs/packsType'
import { SortTitlePackListType } from '../../constans/sort'

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
            const dateCreated = t.created.toString()

            return (
              <tr key={t._id} className={s.tr}>
                <td className={s.td}>{t.name}</td>
                <td className={s.td}>{t.cardsCount}</td>
                <td className={s.td}>{dateUpdate}</td>
                <td className={s.td}>{dateCreated}</td>
                <td className={s.td}>{t.user_id === userId ? 1 : 2}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
