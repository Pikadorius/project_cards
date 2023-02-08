import React from "react";
import s from "./HeaderProfile.module.scss";
import { useAppSelector } from "../../../common/hooks/AppSelector";
import { userNameHandler } from "../../../common/utils/userNameHandler";
import { AccountMenu } from "../../../common/components/AccountMenu/AccountMenu";

const HeaderProfile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userName = userNameHandler(user.name);
  return (
    <div className={s.profileContainer}>
      <div className={s.userName}>{userName}</div>
      <AccountMenu />
    </div>
  );
};

export default HeaderProfile;
