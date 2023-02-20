import React, { FC, memo } from 'react'

import { useAppSelector } from '../../../../../common/hooks'
import { AnswerStatuses } from '../../learnCardSlice'

import s from './GradesItem.module.scss'

type GradesItemType = {
  onChangeChecked: (isActive: AnswerStatuses, grade: number) => void
}

export const GradesItem: FC<GradesItemType> = memo(({ onChangeChecked }) => {
  const gradesCardLearn = useAppSelector(state => state.learnCard)

  return (
    <div className={s.gradesItem}>
      <div className={s.grades}>Rate yourself:</div>
      {gradesCardLearn.map((g, i) => {
        return (
          <div key={i} className={s.inputItem}>
            <label>
              <input
                type={'checkbox'}
                className={s.customCheckbox}
                checked={g.status === AnswerStatuses.IsActive}
                onChange={e =>
                  onChangeChecked(
                    e.currentTarget.checked ? AnswerStatuses.IsActive : AnswerStatuses.IsNoActive,
                    g.id
                  )
                }
              />
              <span>{g.title}</span>
            </label>
          </div>
        )
      })}
    </div>
  )
})
