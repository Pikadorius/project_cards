import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

type PropsType = {
  label: string
  value: string
  submit: (newValue: string) => void
  focus?: boolean
}
const CustomInput: FC<PropsType> = ({ focus, label, value, submit }) => {
  const [newValue, setNewValue] = useState(value)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.currentTarget.value)
  }

  const resetInput = () => {
    setNewValue('')
  }

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit(newValue)
    }
  }

  return (
    <label>
      {label}
      <input
        autoFocus={focus}
        value={newValue}
        onChange={onChangeHandler}
        onKeyDown={onEnterHandler}
      />
      <button onClick={resetInput}>x</button>
    </label>
  )
}

export default CustomInput
