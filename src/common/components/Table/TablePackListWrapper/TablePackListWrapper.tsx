import React, { ReactNode } from 'react'

import { PackListType } from '../../../../app/appSlice'
import { PackType } from '../../../../featuries/packs/packsType'
import { useAppSelector } from '../../../hooks/AppSelector'
import { Table } from '../Table'
import { Tbody } from '../Tbody/Tbody'
import { Thead } from '../Thead/Thead'

import s from './TablePackListWrapper.module.scss'

type TablePackListWrapperType = {
  packList?: PackListType
  cardList?: PackListType
  cardPacks?: PackType[]
  children: ReactNode
}

export const TablePackListWrapper: React.FC<TablePackListWrapperType> = ({
  cardList,
  packList,
  cardPacks,
  children,
}) => {
  return (
    <div className={s.container}>
      <Table>
        <Thead packList={packList} />
        {children}
        {/*<Tbody packs={cardPacks} />*/}
      </Table>
    </div>
  )
}
