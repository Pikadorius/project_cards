import React, { FC, ReactNode, useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'

import s from './ModalWrapper.module.scss'

import { Portal } from 'common/components/Portal/Portal'
import { useAppDispatch } from 'common/hooks'
import { resetModalValues } from 'common/utils'

type PropsType = {
  children?: ReactNode
  title: string
}
const ModalWrapper: FC<PropsType> = ({ children, title }) => {
  const dispatch = useAppDispatch()

  const [isShowed, setShowed] = useState(false)
  const closeModal = () => {
    resetModalValues(dispatch)
    setShowed(false)
  }

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  useEffect(() => {
    setShowed(true)
  }, [])

  return (
    <Portal>
      <div className={s.container} style={{ opacity: isShowed ? '1' : '0' }} onClick={closeModal}>
        <div
          onClick={onContentClick}
          className={isShowed ? `${s.wrapper} ${s.activeWrapper}` : s.wrapper}
        >
          <div className={s.modalHeader}>
            <div className={s.title}>{title}</div>
            <IconButton onClick={closeModal} size={'small'}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <div>{children}</div>
        </div>
      </div>
    </Portal>
  )
}

export default ModalWrapper
