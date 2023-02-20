import * as React from 'react'
import { FC } from 'react'

import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate, useParams } from 'react-router-dom'

import { setSearchCardParams } from '../../../features/cards/cardSlice'

import s from './PackMenu.module.scss'

import Delete from 'assets/Delete.svg'
import edit from 'assets/Edit.svg'
import teacher from 'assets/teacher.svg'
import { PATH } from 'common/constans/path'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { deletePackTC, updatePackTC } from 'features/packs/packsSlice'
import { UpdatePackRequestType } from 'features/packs/packsType'

type PackMenuType = {
  title: string
  packId: string | undefined
}

export const PackMenu: FC<PackMenuType> = ({ title, packId }) => {
  let { id } = useParams<{ id: string }>()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const card = useAppSelector(state => state.card.cards)
  const searchParams = useAppSelector(state => state.card.searchParams)
  const open = Boolean(anchorEl)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const deletePack = () => {
    if (packId) {
      dispatch(deletePackTC(packId))

      navigate(PATH.PACK_LIST)
    }
  }

  const updatePack = () => {
    if (packId) {
      const data: UpdatePackRequestType = {
        cardsPack: {
          name: 'Updated pack',
          _id: packId,
        },
      }

      dispatch(updatePackTC(data))
    }
  }

  const learnHandler = () => {
    dispatch(setSearchCardParams({ page: 1, pageCount: searchParams.cardsTotalCount }))

    return navigate(PATH.CARD_LEARN)
  }

  return (
    <React.Fragment>
      <div className={s.menuTitle}>
        <h2>{title}</h2>
        <IconButton onClick={handleClick} sx={{ padding: '0 10px' }}>
          <PendingOutlinedIcon />
        </IconButton>
      </div>

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
        <MenuItem onClick={updatePack}>
          <img className={s.icon} src={edit} alt="edit" /> Edit
        </MenuItem>
        <MenuItem onClick={deletePack}>
          <img className={s.icon} src={Delete} alt="delete" /> Delete
        </MenuItem>
        <MenuItem onClick={learnHandler}>
          <img className={s.icon} src={teacher} alt="learn pack" /> Learn
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
