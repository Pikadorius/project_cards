import React, { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import arrow from '../../../assets/arrow.svg'

import s from './EmptyPack.module.scss'

type EmptyPackType = {
  name: string
  isMyPack?: boolean
}
const EmptyPack: FC<EmptyPackType> = ({ isMyPack, name }) => {
  const navigate = useNavigate()
  const addNewCard = () => {}

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
            <span onClick={addNewCard} className={s.addCardBtn}>
              Add new card
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmptyPack
