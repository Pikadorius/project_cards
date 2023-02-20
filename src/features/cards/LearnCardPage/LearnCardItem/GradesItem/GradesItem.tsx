import React, { FC, memo } from 'react'

import { useAppSelector } from '../../../../../common/hooks'
import { AnswerStatuses } from '../../learnCardSlice'

type GradesItemType = {
  onChangeChecked: (isActive: AnswerStatuses, grade: number) => void
}

export const GradesItem: FC<GradesItemType> = memo(({ onChangeChecked }) => {
  const gradesCardLearn = useAppSelector(state => state.learnCard)

  return (
    <div>
      <div>Rate yourself:</div>
      {gradesCardLearn.map((g, i) => {
        return (
          <div key={i}>
            <input
              type={'checkbox'}
              checked={g.status === AnswerStatuses.IsActive}
              onChange={e =>
                onChangeChecked(
                  e.currentTarget.checked ? AnswerStatuses.IsActive : AnswerStatuses.IsNoActive,
                  g.id
                )
              }
            />
            {g.title}
          </div>
        )
      })}
    </div>
  )
})
