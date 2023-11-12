import { Route, Routes } from "react-router-dom";
import AdminSidebar from "../layout/AdminSidebar";

import React from "react";
import AdminHome from "../pages/Admin/AdminHome";
import RequireAuth from "../utils/RequireAuth";
import Tablo from "../pages/Admin/Tablo";
import User from "../pages/Admin/User";
import Ayarlar from "../pages/Admin/Ayarlar";
export const AdminRoute = () => {
  return (
    <React.Fragment>
      {/* Admin routes */}
      <AdminSidebar />
      <div className="ml-56 pt-6 flex flex-1 overflow-x-auto">
        <Routes>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route index element={<AdminHome />} />
            <Route path="Tablo" element={<Tablo />} />
            <Route path="User" element={<User />} />
            <Route path="Ayarlar" element={<Ayarlar />} />
          </Route>
        </Routes>
      </div>
    </React.Fragment>
  );
};
