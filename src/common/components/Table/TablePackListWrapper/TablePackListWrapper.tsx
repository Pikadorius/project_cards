import React, { memo, ReactNode } from 'react'

import { CardListType, PackListType } from '../../../../app/appSlice'
import { PackType } from '../../../../featuries/packs/packsType'
import { Table } from '../Table'
import { Thead } from '../Thead/Thead'

import s from './TablePackListWrapper.module.scss'

type TablePackListWrapperType = {
  packList?: PackListType
  cardList?: CardListType
  packs?: PackType[]
  children: ReactNode
}

export const TablePackListWrapper: React.FC<TablePackListWrapperType> = memo(
  ({ cardList, packList, packs, children }) => {
    return (
      <div className={s.container}>
        <Table>
          <Thead packList={packList} cardList={cardList} />
          {children}
          {/*<Tbody packs={packs} />*/}
        </Table>
      </div>
    )
  }
)
