import React, { useEffect } from 'react'

import './App.css'

import { useSearchParams } from 'react-router-dom'

import { appStatusSelector, isInitializedSelector } from './appSelectors'

import { Header } from 'common/components/Header/Header'
import Loader from 'common/components/Loader/Loader'
import SimpleSnackbar from 'common/components/SnackBar/Snackbar'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { authMeTC } from 'features/auth/authSlice'
import Pages from 'pages/Pages'

function App() {
  const dispatch = useAppDispatch()

  const isInitialized = useAppSelector(isInitializedSelector)
  const appStatus = useAppSelector(appStatusSelector)
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
