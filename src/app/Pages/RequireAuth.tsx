import React from "react";
import { useAppSelector } from "../../common/hooks/AppSelector";
import { PATH } from "../../common/constans/path";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />;
  return <Outlet />;
};

export default RequireAuth;
