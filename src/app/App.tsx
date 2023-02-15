import React, { useEffect } from 'react'

import './App.css'

import { useSearchParams } from 'react-router-dom'

import Loader from '../common/components/Loader/Loader'
import SimpleSnackbar from '../common/components/SnackBar/Snackbar'
import { useAppDispatch } from '../common/hooks/AppDispatch'
import { useAppSelector } from '../common/hooks/AppSelector'
import { getAppStatus, getIsInitialized } from '../common/selectors/selectors'
import { authMeTC } from '../featuries/auth/authSlice'

import { Header } from './Header/Header'
import Pages from './Pages/Pages'

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
