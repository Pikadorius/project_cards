import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

import { Slider } from '@mui/material'

import { setSearchParams } from '../../../featuries/packs/packsSlice'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { useAppSelector } from '../../hooks/AppSelector'

import s from './Range.module.scss'

export const Range = () => {
  const dispatch = useAppDispatch()
  const params = useAppSelector(state => state.packs.searchParams)
  const { minCardsCount, maxCardsCount, min, max } = params

  const [value, setValue] = useState<number[]>([minCardsCount, maxCardsCount])

  useEffect(() => {
    setValue([minCardsCount, maxCardsCount])
  }, [minCardsCount, maxCardsCount])
  console.log(value)

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
  }

  const changeMaxValueOnPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let newValue: number | number[] = Number(e.currentTarget.value)

      setValue([value[0], newValue])
      dispatch(setSearchParams({ ...params, max: newValue }))
    }
  }

  const handleChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const handleChangeCommitted = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    dispatch(setSearchParams({ ...params, min: value[0], max: value[1] }))
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
          key={maxCardsCount + '' + minCardsCount}
          getAriaLabel={() => 'Temperature range'}
          value={value}
          defaultValue={[minCardsCount, maxCardsCount]}
          onChange={handleChange}
          min={minCardsCount}
          max={maxCardsCount}
          valueLabelDisplay="auto"
          onChangeCommitted={handleChangeCommitted}
        />
        <div className={s.inputContainer}>
          <span className={s.description}>max:</span>
          <input
            onChange={changeMaxValue}
            value={value[1]}
            className={s.input}
            onKeyDown={changeMaxValueOnPressEnter}
          />
        </div>
      </div>
    </div>
  )
}
