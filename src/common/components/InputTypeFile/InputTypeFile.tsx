import React, { ChangeEvent, FC, memo, useState } from 'react'

import s from './InputTypeFile.module.scss'

type InputType = {
  label: string
  callback: (value: string) => void
}

export const InputTypeFile: FC<InputType> = memo(({ label, callback }) => {
  const [image, setImage] = useState('')

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          callback(file64)
          setImage(file64)
        })
      } else {
        console.error('Error: ', 'The file is too large')
      }
    }
  }

  console.log(image)

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
  }

  return (
    <>
      <label className={s.labelInput}>{label}</label>
      <div className={s.labelContainer}>
        <label className={s.label}>
          <span className={s.labelText}>Change cover</span>

          {image && <div className={s.img} style={{ backgroundImage: `url(${image})` }} />}
          <input
            type="file"
            style={{ display: 'none' }}
            accept={'.png, .jpg, .jpeg, .gif'}
            onChange={uploadHandler}
          />
        </label>
      </div>
    </>
  )
})
