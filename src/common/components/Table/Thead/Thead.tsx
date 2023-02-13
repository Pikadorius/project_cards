import React from 'react'

import {
  CardListType,
  PackListType,
  setSortStatusCards,
  setSortStatusPack,
} from '../../../../app/appSlice'
import sort from '../../../../assets/sortTable.svg'
import { setSearchParams } from '../../../../featuries/packs/packsSlice'
import { useAppDispatch } from '../../../hooks/AppDispatch'
import { useAppSelector } from '../../../hooks/AppSelector'

import s from './Thead.module.scss'

type TheadType = {
  packList?: PackListType
  cardList?: CardListType
}

export const Thead: React.FC<TheadType> = ({ packList, cardList }) => {
  const dispatch = useAppDispatch()
  const params = useAppSelector(state => state.packs.searchParams)
  const sortParam = packList ? packList : cardList

  const thList = sortParam?.map((el, i) => {
    const sortHandler = () => {
      debugger
      const status = el.status === 0 ? 1 : 0

      if (packList) {
        const newPacksList = packList.map(p =>
          p.title === el.title ? { ...p, status: status } : p
        )

        dispatch(setSortStatusPack(newPacksList))
        dispatch(setSearchParams({ ...params, sortPack: `${el.status}${el.sortName}` }))
      }
      if (cardList) {
        console.log('1')
        const newPacksList = cardList.map(p =>
          p.title === el.title ? { ...p, status: status } : p
        )

        dispatch(setSortStatusCards(newPacksList))
        // dispatch(setSearchParams({ ...params, sortPack: `${el.status}${el.sortName}` }))
      }
    }

    return (
      <th key={i + 1} className={s.th}>
        {i < 4 ? (
          <div className={s.titleContainer}>
            <span className={s.sortText}>{el.title}</span>
            <img
              onClick={sortHandler}
              className={el.status === 1 ? s.iconSort : `${s.iconSort} ${s.rotate}`}
              src={sort}
              alt="sort"
            />
          </div>
        ) : (
          <div className={s.titleContainer}>
            <span className={s.sortText}>{el.title}</span>
          </div>
        )}
      </th>
    )
  })

  return (
    <thead className={s.header}>
      <tr className={s.tr}>{thList}</tr>
    </thead>
  )
}
