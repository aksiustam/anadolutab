import React from "react";
import { Navigate, Route } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ user, component: Component, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          // Kullanıcı girişi yapılmamışsa, giriş sayfasına yönlendir
          return <Navigate to="/Auth/Login" replace />;
        }

        if (roles && roles.length > 0 && !roles.includes(user.role)) {
          // Kullanıcının rolü belirtilen rollerden biriyle eşleşmiyorsa, yetki hatası
          return <Navigate to="/unauthorized" replace />;
        }

        // Kullanıcı girişi yapılmış ve rolü uygunsa, bileşeni render et
        return <Component {...props} />;
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.user, // Redux'tan kullanıcı bilgilerini al
});

export default connect(mapStateToProps)(ProtectedRoute);
