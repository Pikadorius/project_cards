import React, { useEffect } from 'react'

import { Navigate, useSearchParams } from 'react-router-dom'

import { PATH } from '../../../common/constans/path'
import { useAppDispatch } from '../../../common/hooks/AppDispatch'
import { useAppSelector } from '../../../common/hooks/AppSelector'
import { getIsLoggedIn } from '../../../common/selectors/selectors'
import { fetchPacks, setSearchParams } from '../../../featuries/packs/packsSlice'

import s from './PackList.module.scss'

export const PackList = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const searchParams = useAppSelector(state => state.packs.searchParams)
  const page = useAppSelector(state => state.packs.searchParams.page)
  const dispatch = useAppDispatch()

  const [urlParams, setUrlParams] = useSearchParams()

  const nextPage = () => {
    dispatch(setSearchParams({ ...searchParams, page: page + 1 }))
    setUrlParams(`page=${searchParams.page}?min=${searchParams.min}`)
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchPacks())
  }, [page])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.container}>
      <h2>Pack List</h2>
      {packs.map(p => {
        return <div key={p._id}>{p.name}</div>
      })}
      <button onClick={nextPage}>Next</button>
    </div>
  )
}
