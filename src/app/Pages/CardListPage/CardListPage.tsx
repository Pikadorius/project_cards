import React, { useEffect } from 'react'

import { Navigate, useParams } from 'react-router-dom'

import { Search } from '../../../common/components/Search/Search'
import { SearchPanel } from '../../../common/components/SearchPanel/SerachPanel'
import { TablePackListWrapper } from '../../../common/components/Table/TablePackListWrapper/TablePackListWrapper'
import { TbodyCard } from '../../../common/components/Table/TbodyCard/TbodyCard'
import { PATH } from '../../../common/constans/path'
import { useAppDispatch } from '../../../common/hooks/AppDispatch'
import { useAppSelector } from '../../../common/hooks/AppSelector'
import { getIsLoggedIn } from '../../../common/selectors/selectors'
import { fetchCardTC } from '../../../featuries/card/cardSlice'
import { setSearchParams } from '../../../featuries/packs/packsSlice'
import { PacksHeader } from '../PackList/PacksHeader/PacksHeader'

import s from './CardListPage.module.scss'

export const CardListPage = () => {
  const dispatch = useAppDispatch()
  let { id } = useParams<{ id: string }>()
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const cardsList = useAppSelector(state => state.app.cardList)
  const card = useAppSelector(state => state.card.cards)
  const cardQuestion = useAppSelector(state => state.card.searchParams.cardQuestion)

  const searchByName = (value: string) => {
    console.log(value)
  }
  const createCards = () => {
    console.log('createCards')
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  useEffect(
    function () {
      if (!id) return
      dispatch(fetchCardTC(id))
    },
    [id]
  )

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <PacksHeader title={'Card list'} buttonTitle={'Add new card'} onClick={createCards} />
          <SearchPanel>
            <Search initialValue={cardQuestion} onChange={searchByName} />
          </SearchPanel>
          <TablePackListWrapper cardList={cardsList}>
            <TbodyCard card={card} />
          </TablePackListWrapper>
          {/*  <Tbody packs={cardPacks} />*/}
          {/*</TablePackListWrapper>*/}
          {/*<SuperPagination
            page={page}
            totalCount={totalPagesCount}
            itemsCountForPage={pageCount}
            onChange={onChange}
          />*/}
        </div>
      </div>
    </div>
  )
}
