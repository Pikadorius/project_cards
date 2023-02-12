import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { Search } from '../../../common/components/Search/Search'
import { SearchPanel } from '../../../common/components/SearchPanel/SerachPanel'
import { Sort } from '../../../common/components/Sort/Sort'
import { useAppDispatch } from '../../../common/hooks/AppDispatch'
import { fetchCardTC } from '../../../featuries/card/cardSlice'

import { CardHeader } from './CardHeader/CardHeader'
import s from './CardListPage.module.scss'

export const CardListPage = () => {
  const dispatch = useAppDispatch()
  let { cardsPack_id } = useParams()

  const createCards = () => {
    console.log('createCards')
  }

  useEffect(function () {
    debugger
    if (cardsPack_id) {
      dispatch(fetchCardTC(cardsPack_id))
    }
  }, [])

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <CardHeader title={'Card list'} buttonTitle={'Add new card'} onClick={createCards} />
          <SearchPanel>
            <Search page={'card'} />
            <Sort />
          </SearchPanel>
          {/*<TablePackListWrapper packList={packList}>*/}
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
