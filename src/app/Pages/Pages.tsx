import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PATH } from "../../common/constans/path";
import { Login } from "../../featuries/auth/Login/Login";
import { Registration } from "../../featuries/auth/Registration/Registration";
import { Recovery } from "../../featuries/auth/Recovery/Recovery";
import RequireAuth from "./RequireAuth";
import { Profile } from "./Profile/Profile";

const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Registration />} />
      <Route path={PATH.RECOVERY} element={<Recovery />} />

      <Route element={<RequireAuth />}>
        <Route path={"/"} element={<Navigate to={"/profile"} />} />
        <Route path={PATH.ACCOUNT} element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Pages;
