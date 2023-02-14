import React from 'react'

import { ButtonGroupe } from '../ButtonGroupe/ButtonGroupe'
import { Range } from '../Range/Range'
import { ResetSort } from '../ResetSort/ResetSort'

import s from './Sort.module.scss'

export const Sort = () => {
  return (
    <div className={s.container}>
      <ButtonGroupe />
      <Range />
      <ResetSort />
    </div>
  )
}
