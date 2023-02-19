import React, { FC, ReactNode, useEffect, useState } from 'react'

import { setModalActive } from '../../../app/appSlice'

import s from './Modal.module.scss'

import { useAppDispatch, useDebounce } from 'common/hooks'

type PropsType = {
  title: string
  children?: ReactNode
}
export const Modal: FC<PropsType> = ({ children, title }) => {
  const dispatch = useAppDispatch()
  const [isClosing, setIsClosing] = useState(false)
  let debouncedValue = useDebounce<boolean>(isClosing, 600)
  const closeModal = () => {
    setIsClosing(true)
  }

  useEffect(() => {
    if (isClosing) {
      dispatch(setModalActive(false))
    }
  }, [debouncedValue])

  return (
    <div onClick={closeModal} className={isClosing ? `${s.container} ${s.close}` : s.container}>
      <div className={s.wrapper}>
        <div className={s.content}>
          <div className={s.title}>{title}</div>
          {children}
          <button onClick={closeModal}>close</button>
        </div>
      </div>
    </div>
  )
}
