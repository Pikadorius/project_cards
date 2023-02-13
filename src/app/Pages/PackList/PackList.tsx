import React, { useEffect } from 'react'

import { Navigate, useSearchParams } from 'react-router-dom'

import SuperPagination from '../../../common/components/IgnatTasksComponents/c9-SuperPagination/SuperPagination'
import { Search } from '../../../common/components/Search/Search'
import { SearchPanel } from '../../../common/components/SearchPanel/SerachPanel'
import { Sort } from '../../../common/components/Sort/Sort'
import { TablePackListWrapper } from '../../../common/components/Table/TablePackListWrapper/TablePackListWrapper'
import { Tbody } from '../../../common/components/Table/Tbody/Tbody'
import { PATH } from '../../../common/constans/path'
import { useAppDispatch } from '../../../common/hooks/AppDispatch'
import { useAppSelector } from '../../../common/hooks/AppSelector'
import { getIsLoggedIn, getPackSearchParams } from '../../../common/selectors/selectors'
import { createPackTC, fetchPacksTC, setSearchParams } from '../../../featuries/packs/packsSlice'

import s from './PackList.module.scss'
import { PacksHeader } from './PacksHeader/PacksHeader'

export const PackList = () => {
  const packList = useAppSelector(state => state.app.packList)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const isLoggedIn = useAppSelector(getIsLoggedIn)

  const pageCount = useAppSelector(state => state.packs.searchParams.pageCount)
  const totalPagesCount = useAppSelector(state => state.packs.searchParams.totalPagesCount)
  const page = useAppSelector(state => state.packs.searchParams.page)
  const max = useAppSelector(state => state.packs.searchParams.max)
  const min = useAppSelector(state => state.packs.searchParams.min)
  const user_id = useAppSelector(state => state.packs.searchParams.user_id)
  const sortPack = useAppSelector(state => state.packs.searchParams.sortPack)
  const packName = useAppSelector(state => state.packs.searchParams.packName)

  const dispatch = useAppDispatch()

  const [urlParams, setUrlParams] = useSearchParams()

  const onChange = (page: number, pageCount: number) => {
    dispatch(setSearchParams({ page, pageCount }))
  }

  const createPack = () => {
    dispatch(createPackTC({ cardsPack: { name: 'test pack' } }))
  }

  const searchByName = (value: string) => {
    dispatch(setSearchParams({ packName: value }))
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchPacksTC())
    setUrlParams(
      `page=${page}&pageCount=${pageCount}&min=${min}&max=${max}&user_id=${user_id}&packName=${packName}`
    )
  }, [page, pageCount, min, max, sortPack, user_id, packName])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <PacksHeader title={'Packs list'} buttonTitle={'Add new pack'} onClick={createPack} />
          <SearchPanel>
            <Search initialValue={packName} onChange={searchByName} />
            <Sort />
          </SearchPanel>
          {/*<TablePackListWrapper packList={packList} packs={packs} />*/}
          <TablePackListWrapper packList={packList}>
            <Tbody packs={packs} />
          </TablePackListWrapper>
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
