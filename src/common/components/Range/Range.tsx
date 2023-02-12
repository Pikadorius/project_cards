import React, { ChangeEvent, KeyboardEvent } from 'react'

import { Slider } from '@mui/material'

import { setSearchParams } from '../../../featuries/packs/packsSlice'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { useAppSelector } from '../../hooks/AppSelector'

import s from './Range.module.scss'

export const Range = () => {
  const dispatch = useAppDispatch()
  const params = useAppSelector(state => state.packs.searchParams)

  const [value, setValue] = React.useState<number[]>([0, 100])

  const changeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue: number | number[] = Number(e.currentTarget.value)

    setValue([newValue, value[1]])
  }

  const changeMinValueOnPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newValue: number | number[] = Number(e.currentTarget.value)

      setValue([newValue, value[1]])
      dispatch(setSearchParams({ ...params, min: newValue }))
    }
  }

  const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue: number | number[] = Number(e.currentTarget.value)

    setValue([value[0], newValue])
    dispatch(setSearchParams({ ...params, max: newValue }))
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
          <input
            onChange={changeMinValue}
            onKeyDown={changeMinValueOnPressEnter}
            value={value[0]}
            className={s.input}
          />
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
