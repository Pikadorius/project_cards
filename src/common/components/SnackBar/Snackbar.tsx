import * as React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'

import { setAppError } from '../../../app/appSlice'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { useAppSelector } from '../../hooks/AppSelector'

export default function SimpleSnackbar() {
  const error = useAppSelector(state => state.app.appError)
  const dispatch = useAppDispatch()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppError(null))
  }

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={handleClose}
      message={error}
      action={action}
    />
  )
}
