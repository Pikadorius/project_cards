import React, { memo } from 'react'

import { useNavigate } from 'react-router-dom'

import { deletePackTC, updatePackTC } from '../../../../featuries/packs/packsSlice'
import { PackType, UpdatePackRequestType } from '../../../../featuries/packs/packsType'
import { PATH } from '../../../constans/path'
import { useAppDispatch } from '../../../hooks/AppDispatch'
import { useAppSelector } from '../../../hooks/AppSelector'
import { dateHandler } from '../../../utils/dateHandler'
import { userNameHandler } from '../../../utils/userNameHandler'
import { DeleteIcon } from '../../Icon/DeleteIcon/Delete'
import { EditIcon } from '../../Icon/EditIcon/EditIcon'
import { TeachIcon } from '../../Icon/TeachIcon/TeachIcon'

import s from './Tbody.module.scss'

type TbodyType = {
  packs?: PackType[]
}

export const Tbody: React.FC<TbodyType> = memo(({ packs }) => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.auth.user._id)
  const navigate = useNavigate()

  return (
    <tbody>
      {packs?.map(t => {
        const dateUpdate = dateHandler(t.updated)
        const userName = userNameHandler(t.user_name)
        const getCardsPack = () => {
          return navigate(`${PATH.CARD_LIST}/${t._id}`)
        }

        const deletePack = () => {
          dispatch(deletePackTC(t._id))
        }

        const updatePack = () => {
          const data: UpdatePackRequestType = {
            cardsPack: {
              name: 'Updated pack',
              _id: t._id,
            },
          }

          dispatch(updatePackTC(data))
        }

        const teachPack = () => {
          alert('Learn pack')
        }

        let resClass = t.cardsCount === 0 ? '#908c8c' : ''
        const teachIcon = resClass ? (
          <TeachIcon stroke={resClass} />
        ) : (
          <TeachIcon onClick={teachPack} stroke={resClass} />
        )

        return (
          <tr key={t._id} className={s.tr}>
            <td onClick={getCardsPack} className={`${s.td} ${s.packTitle}`}>
              <span>{t.name}</span>
            </td>
            <td className={s.td}>{t.cardsCount}</td>
            <td className={s.td}>{dateUpdate}</td>
            <td className={s.td}>{userName}</td>
            <td className={s.td}>
              {t.user_id === userId ? (
                <div className={s.iconContainer}>
                  {teachIcon}

                  <EditIcon onClick={updatePack} />
                  <DeleteIcon onClick={deletePack} />
                </div>
              ) : (
                teachIcon
              )}
            </td>
          </tr>
        )
      })}
    </tbody>
  )
})

/*
    <button
className={s.disabledBtn}
disabled={t.cardsCount === 0}
onClick={() => {
  alert('Learn pack')
}}
>
<img className={s.icon} src={teacher} alt="learn pack" />
    </button>*/
