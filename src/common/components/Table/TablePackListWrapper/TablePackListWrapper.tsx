import React from 'react'

import { CardsListType, PackListType } from '../../../../app/appSlice'
import { InitialStateTypeCards } from '../../../../featuries/cards/cardsSlice'
import { PackType } from '../../../../featuries/packs/packsType'
import { Table } from '../Table'
import { Tbody } from '../Tbody/Tbody'
import { Thead } from '../Thead/Thead'

import s from './TablePackListWrapper.module.scss'

type TablePackListWrapperType = {
  packList?: PackListType
  cardList?: CardsListType
  packs?: PackType[]
  packCard?: InitialStateTypeCards[]
}

export const TablePackListWrapper: React.FC<TablePackListWrapperType> = ({
  cardList,
  packList,
  packCard,
  packs,
}) => {
  return (
    <div className={s.container}>
      <Table>
        <Thead packList={packList} cardList={cardList} />
        <Tbody packs={packs} />
      </Table>
    </div>
  )
}
