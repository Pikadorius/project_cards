import React, { useState } from 'react'

import { Logout, Settings } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'

import ava from '../../../assets/ava.png'
import { logoutTC } from '../../../features/auth/authSlice'
import { setSearchParams } from '../../../features/packs/packsSlice'
import { PATH } from '../../constans/path'
import { useAppDispatch, useAppSelector } from '../../hooks'

export function AccountMenu() {
  const dispatch = useAppDispatch()
  const user_id = useAppSelector(state => state.auth.user._id)
  const logoutHandler = () => {
    dispatch(logoutTC())
  }
  const goToPacks = () => {
    dispatch(setSearchParams({ user_id }))
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={ava} sx={{ width: 36, height: 36 }}>
              M
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to={PATH.ACCOUNT}>
          <MenuItem onClick={handleClose}>
            <Avatar src={ava} /> My account
          </MenuItem>
        </Link>
        <Link to={PATH.PACK_LIST}>
          <MenuItem onClick={goToPacks}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            My packs
          </MenuItem>
        </Link>

        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
