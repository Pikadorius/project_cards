import React, { FC, memo, useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { PATH } from '../../../../common/constans/path'
import { authUserIdSelector } from '../../../auth/authSelectors'
import { packsSelector } from '../../../packs/packsSelectors'
import { PackType } from '../../../packs/packsType'
import { cardSelector, packNameCardSelector, packUserIdCardSelector } from '../cardSelectors'

import s from './CardHeader.module.scss'

import { PackMenu } from 'common/components/PackMenu/PackMenu'
import { useAppSelector } from 'common/hooks/useAppSelector'

type CardHeaderType = {
  onClick: () => void
  //pack: PackType | undefined
}

export const CardHeader: FC<CardHeaderType> = memo(({ onClick }) => {
  let { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const userId = useAppSelector(authUserIdSelector)
  const cards = useAppSelector(cardSelector)
  const packUserId = useAppSelector(packUserIdCardSelector)
  const packName = useAppSelector(packNameCardSelector)
  const pack = useAppSelector(state => state.packs.cardPacks.find(p => p._id === id))
  let packByName = pack ? pack.user_name : 'Unknown...'

  let isMyCard = userId === packUserId

  useEffect(() => {
    console.log(pack)
  }, [pack, cards])

  return (
    <div className={s.innerWrapper}>
      <div className={s.wrapper}>
        {isMyCard ? (
          <PackMenu title={packName} packId={id} />
        ) : (
          <h2 className={s.title}>{packName}</h2>
        )}
        {!isMyCard && <div>{`@${packByName}`}</div>}
      </div>
      {isMyCard ? (
        <div className={s.btnBlock}>
          <button
            onClick={() => navigate(PATH.CARD_LEARN)}
            className={s.btn}
            //disabled={pack && pack.cardsCount === 0}
            disabled={cards.length === 0}
          >
            Learn pack
          </button>
          <button onClick={onClick} className={s.btn}>
            Add new card
          </button>
        </div>
      ) : (
        <div className={s.btnBlock}>
          <button
            onClick={() => navigate(PATH.CARD_LEARN)}
            className={s.btn}
            disabled={cards.length === 0}
          >
            Learn pack
          </button>
        </div>
      )}
    </div>
  )
})
