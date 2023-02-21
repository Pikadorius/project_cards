import * as React from 'react'
import { FC } from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import ModalBody from '../Modals/ModalBody/ModalBody'

import s from './PackMenu.module.scss'

import { isPackDeletedSelector, modalTypeSelector } from 'app/appSelectors'
import { setChangedItemId, setChangedItemName, setIsPackDeleted, setModal } from 'app/appSlice'
import Delete from 'assets/Delete.svg'
import dots from 'assets/dots.svg'
import edit from 'assets/Edit.svg'
import teacher from 'assets/teacher.svg'
import { PATH } from 'common/constans/path'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { fetchCardTC, setSearchCardParams } from 'features/cards/cardSlice'

type PackMenuType = {
  title: string
  packId: string | undefined
}

export const PackMenu: FC<PackMenuType> = ({ title, packId }) => {
  console.log(packId)
  let { id } = useParams<{ id: string }>()

  console.log(id)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const modalType = useAppSelector(modalTypeSelector)
  const cards = useAppSelector(state => state.card.cards)
  const searchParams = useAppSelector(state => state.card.searchParams)
  const isPackDeleted = useAppSelector(isPackDeletedSelector)
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
      dispatch(setModal('deletePack'))
      dispatch(setChangedItemId(packId))
      dispatch(setChangedItemName(title))
    }
  }

  const updatePack = () => {
    if (packId) {
      dispatch(setModal('updatePack'))
      dispatch(setChangedItemId(packId))
      dispatch(setChangedItemName(title))
    }
  }

  const learnHandler = () => {
    // localStorage.setItem('pageCount', String(searchParams.pageCount))
    dispatch(setSearchCardParams({ page: 1, pageCount: searchParams.cardsTotalCount }))
    if (id) dispatch(fetchCardTC(id))

    return navigate(PATH.CARD_LEARN)
  }

  if (isPackDeleted) {
    dispatch(setIsPackDeleted(false))

    return <Navigate to={PATH.PACK_LIST} />
  }

  return (
    <React.Fragment>
      <div className={s.menuTitle}>
        <h2 className={s.title}>{title}</h2>
        <img className={s.dots} onClick={handleClick} src={dots} alt={'dots'} />
      </div>
      {modalType !== 'idle' && <ModalBody modalType={modalType} />}
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
        <MenuItem onClick={learnHandler} disabled={cards.length === 0}>
          <img className={s.icon} src={teacher} alt="learn pack" /> Learn
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
