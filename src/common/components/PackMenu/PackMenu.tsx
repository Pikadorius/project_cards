import * as React from 'react'
import { FC } from 'react'

import Menu from '@mui/material/Menu'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import s from './PackMenu.module.scss'

import dots from 'assets/dots.svg'
import { PATH } from 'common/constans/path'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { FriendMenuItem } from 'features/cards/CardList/CardHeader/Menu/FriendMenuItem'
import { MyMenuItem } from 'features/cards/CardList/CardHeader/Menu/MyMenuItem'
import { fetchCardTC, setSearchCardParams } from 'features/cards/cardSlice'
import { isPackDeletedSelector } from 'features/modals/modalSelectors'
import {
  setChangedItemId,
  setChangedItemName,
  setIsPackDeleted,
  setModal,
} from 'features/modals/modalSlice'

type PackMenuType = {
  title: string
  packId: string | undefined
  isMyCard: boolean
  packUserId: string
}

export const PackMenu: FC<PackMenuType> = ({ title, packId, isMyCard, packUserId }) => {
  let { id } = useParams<{ id: string }>()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const searchParams = useAppSelector(state => state.card.searchParams)
  const cards = useAppSelector(state => state.card.cards)
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

  const blockUserHandler = () => {
    dispatch(setModal('blockUser'))
  }

  const learnHandler = () => {
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
        {isMyCard ? (
          <MyMenuItem
            updatePack={updatePack}
            deletePack={deletePack}
            learnHandler={learnHandler}
            cards={cards}
          />
        ) : (
          <FriendMenuItem
            blockUserHandler={blockUserHandler}
            learnHandler={learnHandler}
            cards={cards}
          />
        )}
      </Menu>
    </React.Fragment>
  )
}
