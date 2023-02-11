import React, { useState } from 'react'

import s from './ButtonGroupe.module.scss'

export const ButtonGroupe = () => {
  const [toggle, setToggle] = useState<'all' | 'my'>('all')

  const showUserPacksHandler = () => {
    setToggle('my')
  }

  const showAllPacksHandler = () => {
    setToggle('all')
  }

  return (
    <div className={s.container}>
      <h3 className={s.title}>Show packs cards</h3>
      <div className={s.buttonGroupe}>
        <button
          onClick={showUserPacksHandler}
          className={toggle === 'my' ? `${s.btn} ${s.active}` : s.btn}
        >
          My
        </button>
        <button
          onClick={showAllPacksHandler}
          className={toggle === 'all' ? `${s.btn} ${s.active}` : s.btn}
        >
          All
        </button>
      </div>
    </div>
  )
}
