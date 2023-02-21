import React, { FC, memo, useState } from 'react'

import star from '../../../../../assets/star.png'
import starFull from '../../../../../assets/starFull.png'
import { useAppSelector } from '../../../../../common/hooks'
import { AnswerStatuses } from '../../learnCardSlice'

import s from './GradesItem.module.scss'

type GradesItemType = {
  onChangeChecked: (isActive: AnswerStatuses, grade: number) => void
}

export const GradesItem: FC<GradesItemType> = memo(({ onChangeChecked }) => {
  const [starValue, setStarValue] = useState<boolean>(true)

  const gradesCardLearn = useAppSelector(state => state.learnCard)

  const onClickImg = () => {
    setStarValue(false)
  }

  return (
    <div className={s.gradesItem}>
      <h3 className={s.grades}>Rate yourself:</h3>
      <div className={s.gradesBlock}>
        {gradesCardLearn.map((g, i) => {
          return (
            <div key={i} className={s.inputItem}>
              <label>
                <input
                  type={'checkbox'}
                  className={s.customCheckbox}
                  checked={g.status === AnswerStatuses.IsActive}
                  onClick={onClickImg}
                  title={g.title}
                  onChange={e =>
                    onChangeChecked(
                      e.currentTarget.checked ? AnswerStatuses.IsActive : AnswerStatuses.IsNoActive,
                      g.id
                    )
                  }
                />
                <span>{g.title}</span>
                {/*{star && <img src={star} className={s.star} title={g.title} />}
                {!star && <img src={starFull} className={s.star} title={g.title} />}*/}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
})
