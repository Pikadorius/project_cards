import React from "react";
import s from "./HeaderProfile.module.scss";
import { Link } from "react-router-dom";
import ava from "../../../assets/ava.png";

import { useAppSelector } from "../../../common/hooks/AppSelector";
import { PATH } from "../../../common/constans/path";
import { UserNameHandler } from "../../../common/utils/userNameHandler";

const HeaderProfile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userName = UserNameHandler(user.name);
  return (
    <div className={s.profileContainer}>
      <div className={s.userName}>{userName}</div>
      <Link to={PATH.ACCOUNT} className={s.avatarContainer}>
        <img className={s.userAvatar} src={ava} alt="user avatar" />
      </Link>
    </div>
  );
};

export default HeaderProfile;
