import React, { FC, memo } from 'react'

import s from './PacksHeader.module.scss'

type PacksHeaderType = {
  title: string
  buttonTitle: string
  onClick: () => void
  isMyPack?: boolean
}

export const PacksHeader: FC<PacksHeaderType> = memo(
  ({ title, buttonTitle, onClick, isMyPack }) => {
    return (
      <div className={s.innerWrapper}>
        {isMyPack ? (
          <>
            <h2>{title}</h2>
            <button onClick={onClick} className={s.btn}>
              {buttonTitle}
            </button>
          </>
        ) : (
          <h2>{title}</h2>
        )}
      </div>
    )
  }
)
