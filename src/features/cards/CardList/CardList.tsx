import React, { useCallback, useEffect } from 'react'

import { Navigate, useNavigate, useParams } from 'react-router-dom'

import arrow from '../../../assets/arrow.svg'
import { EmptyPack } from '../../../common/components/EmptyPack/EmptyPack'
import SuperPagination from '../../../common/components/IgnatTasksComponents/c9-SuperPagination/SuperPagination'
import { Search } from '../../../common/components/Search/Search'
import { SearchPanel } from '../../../common/components/SearchPanel/SearchPanel'
import { TablePackListWrapper } from '../../../common/components/Table/TablePackListWrapper/TablePackListWrapper'
import { TbodyCard } from '../../../common/components/Table/TbodyCard/TbodyCard'
import { Thead } from '../../../common/components/Table/Thead/Thead'
import { PATH } from '../../../common/constans/path'
import { useAppDispatch, useAppSelector } from '../../../common/hooks'
import { isLoggedInSelector } from '../../auth/authSelectors'
import { createCardTC, fetchCardTC, setSearchCardParams } from '../cardSlice'

import { CardHeader } from './CardHeader/CardHeader'
import s from './CardList.module.scss'

export const CardList = () => {
  const dispatch = useAppDispatch()
  let { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const cardsList = useAppSelector(state => state.app.cardList)
  const card = useAppSelector(state => state.card.cards)
  const page = useAppSelector(state => state.card.searchParams.page)
  const pageCount = useAppSelector(state => state.card.searchParams.pageCount)
  const pagesTotalCount = useAppSelector(state => state.card.searchParams.totalPagesCount)
  const cardQuestion = useAppSelector(state => state.card.searchParams.cardQuestion)
  const sortCards = useAppSelector(state => state.card.searchParams.sortCards)
  const cardsTotalCount = useAppSelector(state => state.card.searchParams.cardsTotalCount)
  const packActive = useAppSelector(state => state.packs.cardPacks.find(p => p._id === id))
  const namePackActive = packActive?.name

  const searchByName = (value: string) => {
    dispatch(setSearchCardParams({ cardQuestion: value }))
  }
  const onChange = (page: number, pageCount: number) => {
    dispatch(setSearchCardParams({ page, pageCount }))
  }

  const createCards = useCallback(() => {
    if (!id) return
    let newCard = {
      cardsPack_id: id,
      question: 'New cards',
      answer: '...',
      grade: 0,
      shots: 4,
      answerImg: 'url or base 64',
      questionImg: 'url or base 64',
      questionVideo: 'url or base 64',
      answerVideo: 'url or base 64',
    }

    dispatch(createCardTC({ card: newCard }))
  }, [id])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  useEffect(
    function () {
      if (!id) return
      dispatch(fetchCardTC(id))
    },
    [id, cardQuestion, sortCards, page, pageCount, namePackActive]
  )

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <div onClick={() => navigate(-1)} className={s.linkBackward}>
            <img className={s.arrow} src={arrow} alt="arrow backward" />
            <span className={s.backwardText}>Back to Packs List</span>
          </div>
          <CardHeader onClick={createCards} />

          <SearchPanel>
            <Search initialValue={cardQuestion} onChange={searchByName} />
          </SearchPanel>
          {cardsTotalCount === 0 ? (
            <EmptyPack />
          ) : (
            <>
              <TablePackListWrapper>
                <Thead cardList={cardsList} />
                <TbodyCard card={card} />
              </TablePackListWrapper>
              <SuperPagination
                page={page}
                totalCount={pagesTotalCount}
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
