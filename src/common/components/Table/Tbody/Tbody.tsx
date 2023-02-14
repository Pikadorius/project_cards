import React from 'react'

import { useNavigate } from 'react-router-dom'

import { deleteCardTC } from '../../../../featuries/card/cardSlice'
import { deletePackTC, updatePackTC } from '../../../../featuries/packs/packsSlice'
import { PackType, UpdatePackRequestType } from '../../../../featuries/packs/packsType'
import { PATH } from '../../../constans/path'
import { useAppDispatch } from '../../../hooks/AppDispatch'
import { useAppSelector } from '../../../hooks/AppSelector'
import { userNameHandler } from '../../../utils/userNameHandler'

import teacher from './../../../../assets/teacher.svg'
import s from './Tbody.module.scss'

type TbodyType = {
  packs?: PackType[]
}

export const Tbody: React.FC<TbodyType> = ({ packs }) => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.auth.user._id)
  const navigate = useNavigate()

  return (
    <tbody>
      {packs?.map(t => {
        const dateUpdate = t.updated.toString()
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

        return (
          <tr key={t._id} className={s.tr}>
            <td onClick={getCardsPack} className={s.td}>
              {t.name}
            </td>
            <td className={s.td}>{t.cardsCount}</td>
            <td className={s.td}>{dateUpdate}</td>
            <td className={s.td}>{userName}</td>
            <td className={s.td}>
              {t.user_id === userId ? (
                <div>
                  <span onClick={deletePack}> Delete </span>
                  <span onClick={updatePack}> Update </span>
                </div>
              ) : (
                <img src={teacher} alt="learn pack" />
              )}
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}
