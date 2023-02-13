import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import search from '../../../assets/search.svg'
import { setSearchParams } from '../../../featuries/packs/packsSlice'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { useAppSelector } from '../../hooks/AppSelector'
import useDebounce from '../../hooks/useDebounce'

import s from './Search.module.scss'

type SearchPropsType = {
  page: 'packs' | 'card'
}

export const Search: FC<SearchPropsType> = memo(({ page }) => {
  const [value, setValue] = useState<string>('')
  let debouncedValue = useDebounce<string>(value, 500)

  const dispatch = useAppDispatch()
  const paramsPackList = useAppSelector(state => state.packs.searchParams)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    switch (page) {
      case 'packs': {
        dispatch(setSearchParams({ ...paramsPackList, packName: debouncedValue }))
        break
      }
      case 'card': {
        console.log('')
        break
      }
      default:
        console.warn('Something went wrong')
    }
  }, [debouncedValue])

  return (
    <div className={s.container}>
      <h3 className={s.title}>Search</h3>
      <div className={s.inputContainer}>
        <input
          className={s.search}
          type="text"
          placeholder={'Search by name'}
          value={value}
          onChange={handleChange}
        />
        <img className={s.searchIcon} src={search} alt="search icon" />
      </div>
    </div>
  )
})
