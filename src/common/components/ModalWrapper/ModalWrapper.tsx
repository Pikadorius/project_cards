import React, { FC, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'

import s from './ModalWrapper.module.scss'

type PropsType = {
  children?: ReactNode
  title: string
}
const ModalWrapper: FC<PropsType> = ({ children, title }) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.modalTitle}>
          {title}
          <IconButton aria-label="delete">
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
