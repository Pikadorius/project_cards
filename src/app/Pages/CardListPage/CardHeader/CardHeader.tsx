import React, { FC, memo } from 'react'

import { useParams } from 'react-router-dom'

import { useAppSelector } from '../../../../common/hooks/AppSelector'

import s from './CardHeader.module.scss'

type CardHeaderType = {
  onClick: () => void
}

export const CardHeader: FC<CardHeaderType> = memo(({ onClick }) => {
  let { id } = useParams<{ id: string }>()
  const userId = useAppSelector(state => state.auth.user._id)
  const packUserId = useAppSelector(state => state.card.searchParams.packUserId)
  const packName = useAppSelector(state => state.card.searchParams.packName)
  const pack = useAppSelector(state => state.packs.cardPacks.find(p => p._id === id))
  let packByName = pack ? pack.user_name : 'Unknown...'

  let isMyCard = userId === packUserId

  return (
    <div className={s.innerWrapper}>
      <div>
        <h2 className={s.title}>{packName}</h2>
        <div>{`@${packByName}`}</div>
      </div>
      {isMyCard && (
        <button onClick={onClick} className={s.btn}>
          Add new card
        </button>
      )}
    </div>
  )
})
