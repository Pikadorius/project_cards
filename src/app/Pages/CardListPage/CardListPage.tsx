import React, { useEffect } from 'react'

import { Navigate, useNavigate, useParams } from 'react-router-dom'

import arrow from '../../../assets/arrow.svg'
import EmptyPack from '../../../common/components/EmptyPack/EmptyPack'
import SuperPagination from '../../../common/components/IgnatTasksComponents/c9-SuperPagination/SuperPagination'
import { Search } from '../../../common/components/Search/Search'
import { SearchPanel } from '../../../common/components/SearchPanel/SerachPanel'
import { TablePackListWrapper } from '../../../common/components/Table/TablePackListWrapper/TablePackListWrapper'
import { TbodyCard } from '../../../common/components/Table/TbodyCard/TbodyCard'
import { PATH } from '../../../common/constans/path'
import { useAppDispatch } from '../../../common/hooks/AppDispatch'
import { useAppSelector } from '../../../common/hooks/AppSelector'
import { getIsLoggedIn } from '../../../common/selectors/selectors'
import { createCardTC, fetchCardTC, setSearchCardParams } from '../../../featuries/card/cardSlice'
import { PacksHeader } from '../PackList/PacksHeader/PacksHeader'

import s from './CardListPage.module.scss'

export const CardListPage = () => {
  const dispatch = useAppDispatch()
  let { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const userId = useAppSelector(state => state.auth.user._id)
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const cardsList = useAppSelector(state => state.app.cardList)
  const card = useAppSelector(state => state.card.cards)
  const page = useAppSelector(state => state.card.searchParams.page)
  const pageCount = useAppSelector(state => state.card.searchParams.pageCount)
  const pagesTotalCount = useAppSelector(state => state.card.searchParams.totalPagesCount)
  const cardQuestion = useAppSelector(state => state.card.searchParams.cardQuestion)
  const sortCards = useAppSelector(state => state.card.searchParams.sortCards)
  const pack = useAppSelector(state => state.packs.cardPacks.find(p => p._id === id))
  const isMyPack = pack && userId === pack.user_id

  const searchByName = (value: string) => {
    dispatch(setSearchCardParams({ cardQuestion: value }))
  }
  const onChange = (page: number, pageCount: number) => {
    dispatch(setSearchCardParams({ page, pageCount }))
  }

  const createCards = () => {
    if (!id) return
    let newCard = {
      cardsPack_id: id,
      question: 'What is your name?',
      answer: 'Den',
      grade: 0,
      shots: 4,
      answerImg: 'url or base 64',
      questionImg: 'url or base 64',
      questionVideo: 'url or base 64',
      answerVideo: 'url or base 64',
    }

    dispatch(createCardTC({ card: newCard }))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  useEffect(
    function () {
      if (!id) return
      dispatch(fetchCardTC(id))
    },
    [id, cardQuestion, sortCards, page, pageCount]
  )

  if (pack && pack.cardsCount === 0) {
    return <EmptyPack isMyPack={isMyPack} name={pack.name} onClick={createCards} />
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div onClick={() => navigate(-2)} className={s.linkBackward}>
          <img className={s.arrow} src={arrow} alt="arrow backward" />
          <span className={s.backwardText}>Back to Packs List</span>
        </div>
        <div className={s.innerWrapper}>
          <PacksHeader title={'Card list'} buttonTitle={'Add new card'} onClick={createCards} />
          <SearchPanel>
            <Search initialValue={cardQuestion} onChange={searchByName} />
          </SearchPanel>
          <TablePackListWrapper cardList={cardsList}>
            <TbodyCard card={card} />
          </TablePackListWrapper>
          <SuperPagination
            page={page}
            totalCount={pagesTotalCount}
            itemsCountForPage={pageCount}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}
