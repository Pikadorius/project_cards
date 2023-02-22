import React, { memo } from 'react'

import star from '../../../../../../assets/star.png'
import starFull from '../../../../../../assets/starFull.png'
import s from '../GradesItem.module.scss'

type StarPropsType = {
  selected: boolean
  setRating: () => void
  description: string
}

export const Star = memo(({ selected, setRating, description }: StarPropsType) => {
  return (
    <div onClick={setRating}>
      {/*{selected ? (
        <div>
          <img className={s.star} alt={'yes'} src={starFull} />
          <div className={s.overlay}>{description}</div>
        </div>
      ) : (
        <div>
          <img className={s.star} alt={'no'} src={star} />
          <div className={s.overlay}>{description}</div>
        </div>
      )}*/}
      {selected ? (
        <div className={s.starItem} data-overlay={description}>
          <img className={s.star} alt={'yes'} src={starFull} />
        </div>
      ) : (
        <div className={s.starItem} data-overlay={description}>
          <img className={s.star} alt={'no'} src={star} />
        </div>
      )}
    </div>
  )
})
