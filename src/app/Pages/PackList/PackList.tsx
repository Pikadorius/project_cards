import React, { useEffect } from 'react'

import { Navigate, useSearchParams } from 'react-router-dom'

import SuperPagination from '../../../common/components/IgnatTasksComponents/c9-SuperPagination/SuperPagination'
import { Search } from '../../../common/components/Search/Search'
import { SearchPanel } from '../../../common/components/SearchPanel/SerachPanel'
import { Sort } from '../../../common/components/Sort/Sort'
import { Table } from '../../../common/components/Table/Table'
import { PATH } from '../../../common/constans/path'
import { sortTitlePackList } from '../../../common/constans/sort'
import { useAppDispatch } from '../../../common/hooks/AppDispatch'
import { useAppSelector } from '../../../common/hooks/AppSelector'
import { getIsLoggedIn } from '../../../common/selectors/selectors'
import { fetchPacks, setSearchParams } from '../../../featuries/packs/packsSlice'

import s from './PackList.module.scss'
import { PacksHeader } from './PacksHeader/PacksHeader'

export const PackList = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const userId = useAppSelector(state => state.auth.user._id)
  // const totalPagesCount = useAppSelector(state => state.packs.searchParams.totalPagesCount)
  const params = useAppSelector(state => state.packs.searchParams)
  const { pageCount, totalPagesCount, page, maxCardsCount, minCardsCount, max, min } = params
  // const page = useAppSelector(state => state.packs.searchParams.page)
  // const pageCount = useAppSelector(state => state.packs.searchParams.pageCount)
  const dispatch = useAppDispatch()

  const [urlParams, setUrlParams] = useSearchParams()

  const onChange = (page: number, pageCount: number) => {
    dispatch(setSearchParams({ ...params, page, pageCount }))
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchPacks())
  }, [page, pageCount, min, max])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <PacksHeader title={'Packs list'} buttonTitle={'Add new pack'} />
          <SearchPanel>
            <Search />
            <Sort />
          </SearchPanel>
          <Table sortTitlePackList={sortTitlePackList} packs={packs} userId={userId} />
          <SuperPagination
            page={page}
            totalCount={totalPagesCount}
            itemsCountForPage={pageCount}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}
