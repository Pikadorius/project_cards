import React, { ChangeEvent } from 'react'

import { Slider } from '@mui/material'

import s from './Range.module.scss'

export const Range = () => {
  const [value, setValue] = React.useState<number[]>([0, 100])

  const changeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue: number | number[] = Number(e.currentTarget.value)

    setValue([newValue, value[1]])
  }

  const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue: number | number[] = Number(e.currentTarget.value)

    setValue([value[0], newValue])
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  return (
    <div className={s.container}>
      <h3 className={s.title}>Number of cards</h3>
      <div className={s.rangeContainer}>
        <div className={s.inputContainer}>
          <span className={s.description}>min:</span>
          <input onChange={changeMinValue} value={value[0]} className={s.input} />
        </div>
        <Slider
          sx={{ width: '200px', color: '#366EFF' }}
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
        <div className={s.inputContainer}>
          <span className={s.description}>max:</span>
          <input onChange={changeMaxValue} value={value[1]} className={s.input} />
        </div>
      </div>
    </div>
  )
}
