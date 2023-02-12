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
import { getIsLoggedIn } from '../../../common/selectors/selectors'
import { createPackTC, fetchPacksTC, setSearchParams } from '../../../featuries/packs/packsSlice'

import s from './PackList.module.scss'
import { PacksHeader } from './PacksHeader/PacksHeader'

export const PackList = () => {
  const packList = useAppSelector(state => state.app.packList)

  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const params = useAppSelector(state => state.packs.searchParams)
  const {
    pageCount,
    totalPagesCount,
    page,
    maxCardsCount,
    minCardsCount,
    max,
    min,
    user_id,
    sortPack,
    packName,
  } = params
  // const page = useAppSelector(state => state.packs.searchParams.page)
  // const pageCount = useAppSelector(state => state.packs.searchParams.pageCount)
  const dispatch = useAppDispatch()

  const [urlParams, setUrlParams] = useSearchParams()

  const onChange = (page: number, pageCount: number) => {
    dispatch(setSearchParams({ ...params, page, pageCount }))
  }

  const createPack = () => {
    dispatch(createPackTC({ cardsPack: { name: 'test pack' } }))
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchPacksTC())
  }, [page, pageCount, min, max, sortPack, user_id])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <PacksHeader title={'Packs list'} buttonTitle={'Add new pack'} onClick={createPack} />
          <SearchPanel>
            <Search />
            <Sort />
          </SearchPanel>
          {/*<TablePackListWrapper packList={packList} />*/}
          <TablePackListWrapper packList={packList}>
            <Tbody packs={cardPacks} />
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
