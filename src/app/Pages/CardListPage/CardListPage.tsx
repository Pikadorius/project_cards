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

import { CardHeader } from './CardHeader/CardHeader'
import s from './CardListPage.module.scss'

export const CardListPage = () => {
  const dispatch = useAppDispatch()
  let { id } = useParams<{ id: string }>()
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const createCards = () => {
    console.log('createCards')
  }
  const cardsList = useAppSelector(state => state.app.cardList)
  const card = useAppSelector(state => state.card.cards)

  useEffect(
    function () {
      if (!id) return
      dispatch(fetchCardTC(id))
    },
    [id]
  )

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <CardHeader title={'Card list'} buttonTitle={'Add new card'} onClick={createCards} />
          <SearchPanel>
            <Search page={'card'} />
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
