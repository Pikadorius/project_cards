import React, { FC, memo } from 'react'

import { useParams } from 'react-router-dom'

import { useAppSelector } from '../../../../common/hooks/AppSelector'
import { PackType } from '../../../../featuries/packs/packsType'
import s from '../../PackList/PacksHeader/PacksHeader.module.scss'

type CardHeaderType = {
  onClick: () => void
  pack?: PackType
}

export const CardHeader: FC<CardHeaderType> = memo(({ onClick, pack }) => {
  let { id } = useParams<{ id: string }>()
  const userId = useAppSelector(state => state.auth.user._id)
  const packUserId = useAppSelector(state => state.card.searchParams.packUserId)
  const packName = useAppSelector(state => state.card.searchParams.packName)
  let packByName

  if (pack) {
    packByName = pack.user_name
  } else {
    packByName = 'Unknown name...'
  }

  let isMyCard = userId === packUserId

  return (
    <div className={s.innerWrapper}>
      <div>
        <h2>{packName}</h2>
        {!isMyCard && <div style={{ opacity: '0.5', marginTop: '10px' }}>{`@${packByName}`}</div>}
      </div>
      {isMyCard && (
        <button onClick={onClick} className={s.btn}>
          Add new card
        </button>
      )}
    </div>
  )
})
