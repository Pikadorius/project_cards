import React from 'react'

import { Pagination } from '@mui/material'

import SuperSelect from '../c5-SuperSelect/SuperSelect'

import s from './SuperPagination.module.css'

export type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  page,
  itemsCountForPage,
  totalCount,
  onChange,
}) => {
  const lastPage = totalCount
  const onChangeCallback = (event: any, page: number) => {
    // пишет студент
    onChange(page, itemsCountForPage)
  }

  const onChangeSelect = (count: number) => {
    // пишет студент
    onChange(page, count)
  }

  return (
    <div className={s.pagination}>
      <Pagination
        sx={
          {
            // стили для Pagination // пишет студент
          }
        }
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        showFirstButton
        showLastButton
      />

      <span className={s.text1}>показать</span>

      <SuperSelect
        value={itemsCountForPage}
        options={[
          { id: 2, value: 2 },
          { id: 4, value: 4 },
          { id: 6, value: 6 },
          { id: 8, value: 8 },
          { id: 10, value: 10 },
        ]}
        onChangeOption={onChangeSelect}
      />

      <span className={s.text2}>строк в таблице</span>
    </div>
  )
}

export default SuperPagination
