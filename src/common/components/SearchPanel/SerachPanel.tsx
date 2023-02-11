import React from 'react'

import s from './SearchPanel.module.scss'

type SearchPanelType = {
  children: React.ReactNode
}

export const SearchPanel: React.FC<SearchPanelType> = ({ children }) => {
  return <div className={s.container}>{children}</div>
}
