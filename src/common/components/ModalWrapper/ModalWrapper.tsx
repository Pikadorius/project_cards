import React, { FC, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'

import { setModal } from '../../../app/appSlice'

import s from './ModalWrapper.module.scss'

import { useAppDispatch } from 'common/hooks'

type PropsType = {
  children?: ReactNode
  title: string
}
const ModalWrapper: FC<PropsType> = ({ children, title }) => {
  const dispatch = useAppDispatch()
  const closeModal = () => {
    dispatch(setModal('idle'))
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
