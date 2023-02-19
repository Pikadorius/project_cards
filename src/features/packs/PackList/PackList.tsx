import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import {
  packsCountOnPageSelector,
  packsListSelector,
  packsMaxSelector,
  packsMinSelector,
  packsNameSelector,
  packsPageSelector,
  packsSelector,
  packsSortSelector,
  packsTotalPageCountSelector,
  packsUserIdSelector,
} from '../packsSelectors'

import s from './PackList.module.scss'
import { PacksHeader } from './PacksHeader/PacksHeader'

import { modalTypeSelector } from 'app/appSelectors'
import { ModalType, setModal } from 'app/appSlice'
import { EmptyPackSearch } from 'common/components/EmptyPackSearch/EmptyPackSearch'
import SuperPagination from 'common/components/IgnatTasksComponents/c9-SuperPagination/SuperPagination'
import ModalBody from 'common/components/Modals/ModalBody/ModalBody'
import { Search } from 'common/components/Search/Search'
import { SearchPanel } from 'common/components/SearchPanel/SearchPanel'
import { Sort } from 'common/components/Sort/Sort'
import { TablePackListWrapper } from 'common/components/Table/TablePackListWrapper/TablePackListWrapper'
import { Tbody } from 'common/components/Table/Tbody/Tbody'
import { Thead } from 'common/components/Table/Thead/Thead'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { isLoggedInSelector } from 'features/auth/authSelectors'
import { fetchPacksTC, setSearchParams } from 'features/packs/packsSlice'

export const PackList = () => {
  const packList = useAppSelector(packsListSelector)
  const packs = useAppSelector(packsSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const pageCount = useAppSelector(packsCountOnPageSelector)
  const totalPagesCount = useAppSelector(packsTotalPageCountSelector)
  const page = useAppSelector(packsPageSelector)
  const max = useAppSelector(packsMaxSelector)
  const min = useAppSelector(packsMinSelector)
  const user_id = useAppSelector(packsUserIdSelector)
  const sortPack = useAppSelector(packsSortSelector)
  const packName = useAppSelector(packsNameSelector)
  const modalType = useAppSelector(modalTypeSelector)
  const emptyCheck = packName !== '' && packs.length === 0

  const dispatch = useAppDispatch()

  const [sortParams, setSortParams] = useSearchParams()

  const setModalType = (modalType: ModalType) => {
    dispatch(setModal(modalType))
  }
  const onChange = (page: number, pageCount: number) => {
    dispatch(setSearchParams({ page, pageCount }))
  }

  const createPack = () => {
    dispatch(setModal('createPack'))
    // dispatch(createPackTC({ cardsPack: { name: 'test pack' } }))
  }

  const searchByName = (value: string) => {
    dispatch(setSearchParams({ packName: value }))
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchPacksTC())
    setSortParams({
      user_id: String(user_id),
      min: String(min),
      max: String(max),
      pageCount: String(pageCount),
      page: String(page),
      packName: packName,
      sortPack: sortPack,
    })
  }, [page, pageCount, min, max, sortPack, user_id, packName])
  s

  return (
    <div className={s.container}>
      {modalType !== 'idle' && <ModalBody modalType={modalType} />}
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <PacksHeader title={'Packs list'} buttonTitle={'Add new pack'} onClick={createPack} />
          <SearchPanel>
            <Search initialValue={packName} onChange={searchByName} />
            <Sort />
          </SearchPanel>
          {emptyCheck ? (
            <EmptyPackSearch />
          ) : (
            <>
              <TablePackListWrapper>
                <Thead packList={packList} />
                <Tbody packs={packs} setModalType={setModalType} />
              </TablePackListWrapper>
              <SuperPagination
                page={page}
                totalCount={totalPagesCount}
                itemsCountForPage={pageCount}
                onChange={onChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
