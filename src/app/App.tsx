import React, { useEffect } from 'react'

import './App.css'

import { useSearchParams } from 'react-router-dom'

import { Header } from '../common/components/Header/Header'
import Loader from '../common/components/Loader/Loader'
import SimpleSnackbar from '../common/components/SnackBar/Snackbar'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { getAppStatus, getIsInitialized } from '../common/selectors/selectors'
import { authMeTC } from '../features/auth/authSlice'
import Pages from '../Pages/Pages'

function App() {
  const dispatch = useAppDispatch()

  const isInitialized = useAppSelector(getIsInitialized)
  const appStatus = useAppSelector(getAppStatus)
  const [searchParams, setSearchParams] = useSearchParams()
  const packsQuery = searchParams.get('packs') || ''

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  if (!isInitialized) {
    return <Loader />
  }

  return (
    <div className="app">
      <Header />
      <Pages />
      <SimpleSnackbar />
      {appStatus === 'loading' && <Loader />}
    </div>
  )
}

export default App
