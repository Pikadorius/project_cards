import React, { FC } from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import arrow from '../../../assets/arrow.svg'
import { PATH } from '../../constans/path'

import s from './EmptyPack.module.scss'

type EmptyPackType = {
  name: string
  isMyPack?: boolean
  onClick: () => void
}
const EmptyPack: FC<EmptyPackType> = ({ isMyPack, name, onClick }) => {
  const navigate = useNavigate()
  const onClickHandler = () => {
    onClick()
    navigate(PATH.PACK_LIST)
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div onClick={() => navigate(-1)} className={s.linkBackward}>
          <img className={s.arrow} src={arrow} alt="arrow backward" />
          <span className={s.backwardText}>Back to Packs List</span>
        </div>
        <div className={s.emptyCardContainer}>
          <h2 className={s.title}>{name}</h2>
          {isMyPack ? (
            <span>This pack is empty. Click add new card to fill this pack</span>
          ) : (
            <span>This pack is empty</span>
          )}
          {isMyPack && (
            <span onClick={onClickHandler} className={s.addCardBtn}>
              Add new card
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmptyPack
