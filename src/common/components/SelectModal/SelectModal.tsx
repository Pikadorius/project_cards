import React, { FC, useState } from 'react'

import arrowDownUp from '../../../assets/arrowDownUp.svg'
import s from '../SelectModal/SelectModal.module.scss'

type SelectModalType = {
  label: string
  selectValue: string
  options: string[]
  onChange: (value: string) => void
}

export const SelectModal: FC<SelectModalType> = ({ label, selectValue, options, onChange }) => {
  const [open, setOpen] = useState(false)

  const mappingOptions = options?.map((el, i) => {
    return (
      <div key={i + 1} onClick={() => onChangeHandler(el)} className={s.option}>
        {el}
      </div>
    )
  })

  const onChangeHandler = (value: string) => {
    onChange(value)
    onClickHandler()
  }

  const onClickHandler = () => {
    setOpen(!open)
  }
  const onBlurHandler = () => {
    setOpen(false)
  }

  let resClass = open ? s.arrowDownUp + ' ' + s.rotate : s.arrowDownUp

  return (
    <div className={s.selectBlock}>
      <label className={s.labelSelect}>
        {label}
        <div className={s.select} onClick={onClickHandler} onBlur={() => onBlurHandler}>
          <span className={s.text}>{selectValue} </span>
          <img className={resClass} src={arrowDownUp} alt="open select" />
        </div>
      </label>
      {open && (
        <div className={s.optionsContainer}>
          <div className={s.optionWrapper}>{mappingOptions}</div>
        </div>
      )}
    </div>
  )
}
