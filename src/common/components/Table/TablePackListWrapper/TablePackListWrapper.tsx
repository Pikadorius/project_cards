import React, { memo, ReactNode } from 'react'

import { CardListType, PackListType } from '../../../../app/appSlice'
import { PackType } from '../../../../featuries/packs/packsType'
import { Table } from '../Table'
import { Thead } from '../Thead/Thead'

import s from './TablePackListWrapper.module.scss'

type TablePackListWrapperType = {
  children: ReactNode
}

export const TablePackListWrapper: React.FC<TablePackListWrapperType> = memo(({ children }) => {
  return (
    <div className={s.container}>
      <Table>{children}</Table>
    </div>
  )
})
