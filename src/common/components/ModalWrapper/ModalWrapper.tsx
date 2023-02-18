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

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.modalTitle}>
          {title}
          <IconButton aria-label="delete" onClick={() => dispatch(setModalActive(false))}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <div>sdsd</div>
        {children}
      </div>
    </div>
  )
}

export default ModalWrapper
