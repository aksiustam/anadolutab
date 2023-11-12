import React from "react";

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const NotRequireAuth = () => {
  const { isAuth } = useSelector((state) => state.user);

  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

export default NotRequireAuth;
