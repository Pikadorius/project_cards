import React from "react";

import s from "./Header.module.scss";
import logo from "../../assets/logo.svg";

import Logo from "../../common/components/Logo/Logo";
import HeaderProfile from "./HeaderProfile/HeaderProfile";

import HeaderSignIn from "./HeaderSignIn/HeaderSignIn";
import { useAppDispatch } from "../../common/hooks/AppDispatch";
import { useAppSelector } from "../../common/hooks/AppSelector";

export const Header = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <header className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <Logo img={logo} />
          {isLoggedIn ? <HeaderProfile /> : <HeaderSignIn />}
        </div>
      </div>
    </header>
  );
};
