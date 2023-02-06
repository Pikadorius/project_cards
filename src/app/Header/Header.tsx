import React from "react";

import s from "./Header.module.scss";
import logo from "../../assets/logo.svg";

import Logo from "../../common/components/Logo/Logo";
import HeaderProfile from './HeaderProfile/HeaderProfile'

import HeaderSignIn from "./HeaderSignIn/HeaderSignIn";

export const Header = () => {
  return (
    <header className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <Logo img={logo} />
          <HeaderSignIn />
          {/* <HeaderProfile/> */}
        </div>
      </div>
    </header>
  );
};
