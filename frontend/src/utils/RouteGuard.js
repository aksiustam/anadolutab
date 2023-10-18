import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const RouteGuard = ({ component: Component, ...rest }) => {
  const { user, isAuth } = useSelector((state) => state.user);

  console.log("user", user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Navigate to="/Auth/Login" state={{ from: location }} replace />
        )
      }
    />
  );
};

export default RouteGuard;
