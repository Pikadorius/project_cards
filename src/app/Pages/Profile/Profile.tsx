import React from "react";
import s from "./Profile.module.scss";
import logout from "../../../assets/logout.svg";
import avatar from "../../../assets/avatarBig.png";
import camera from "../../../assets/cameraIcon.svg";
import { logoutTC } from "../../../featuries/auth/authSlice";
import { useAppDispatch } from "../../../common/hooks/AppDispatch";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const logOutHandler = () => {
    dispatch(logoutTC());
  };
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.profileContainer}>
          <h2 className={s.title}>Personal Information</h2>
          <div className={s.avatarContainer}>
            <div className={s.decoration}>
              <img className={s.cameraIcon} src={camera} alt="camera icon" />
            </div>
            <img src={avatar} alt="user avatar" />
          </div>
          <h3 className={s.userName}>User Name</h3>
          <span className={s.emailText}>j&johnson@gmail.com</span>
          <span onClick={logOutHandler} className={s.logOut}>
            <img className={s.logOutIcon} src={logout} alt="button logout" />
            <span className={s.logOutText}>Log out</span>
          </span>
        </div>
      </div>
    </div>
  );
};