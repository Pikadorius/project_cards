import React from "react";
import s from "./Profile.module.scss";
import logout from "../../../assets/logout.svg";
import avatar from "../../../assets/avatarBig.png";
import camera from "../../../assets/cameraIcon.svg";
import { logoutTC, updateNameTC } from "../../../featuries/auth/authSlice";
import { useAppDispatch } from "../../../common/hooks/AppDispatch";
import { useAppSelector } from "../../../common/hooks/AppSelector";
import EditableSpan from "../../../common/components/EditableSpan/EditableSpan";

export const Profile = () => {
  const dispatch = useAppDispatch();
  // данные для Profile (name and email)
  const user = useAppSelector((state) => state.auth.user);

  // пока только на имя, аватарку не трогал
  const updateName = (newName: string) => {
    dispatch(updateNameTC(newName));
  };

  const logoutHandler = () => {
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
          <h3 className={s.userName}>
            {/*пока сделал новую компоненту, не вижу смысла тут отслеживать с помощью react hook form*/}
            <EditableSpan value={user.name} onChange={updateName} />
          </h3>
          <span className={s.emailText}>{user.email}</span>
          <span onClick={logoutHandler} className={s.logOut}>
            <img className={s.logOutIcon} src={logout} alt="button logout" />
            <span className={s.logOutText}>Log out</span>
          </span>
        </div>
      </div>
    </div>
  );
};
