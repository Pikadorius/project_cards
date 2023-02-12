import React from 'react'

import { SortTitlePackListType } from '../../../constans/sort'

import s from './Thead.module.scss'

type TheadType = {
  sortTitlePackList: SortTitlePackListType
}

export const Thead: React.FC<TheadType> = ({ sortTitlePackList }) => {
  const thList = sortTitlePackList.map((el, i) => (
    <th key={i + 1} className={s.th}>
      {el}
    </th>
  ))

  return (
    <thead className={s.header}>
      <tr className={s.tr}>{thList}</tr>
    </thead>
  )
}
