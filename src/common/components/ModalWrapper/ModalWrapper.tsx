import React, { FC, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'

import s from './ModalWrapper.module.scss'

import { setModalActive } from 'app/appSlice'
import { useAppDispatch } from 'common/hooks'

type PropsType = {
  children?: ReactNode
  title: string
}
const ModalWrapper: FC<PropsType> = ({ children, title }) => {
  const dispatch = useAppDispatch()
  const closeModal = () => {
    dispatch(setModalActive(false))
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
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
  )
}

export default ModalWrapper
