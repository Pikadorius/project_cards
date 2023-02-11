import React from 'react'

import search from '../../../assets/search.svg'

import s from './Search.module.scss'

export const Search = () => {
  return (
    <div className={s.container}>
      <h3 className={s.title}>Search</h3>
      <div className={s.inputContainer}>
        <input className={s.search} type="text" placeholder={'Search by name'} />
        <img className={s.searchIcon} src={search} alt="search icon" />
      </div>
    </div>
  )
}
