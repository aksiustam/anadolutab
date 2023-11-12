import React from "react";
import Header from "../layout/Header";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Footer from "../layout/Footer";

import Home from "../pages/Main/Home";
import Borsa from "../pages/Main/Borsa";
import Hakkımızda from "../pages/Main/Hakkımızda";
import Haberler from "../pages/Main/Haberler";
import İletisim from "../pages/Main/İletisim";
import Detail from "../pages/Detail";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/Layout/NotFound";
import Unauthorized from "../pages/Layout/Unauthorized";

import NotRequireAuth from "../utils/NotRequireAuth";

export const HomeRoute = () => {
  return (
    <React.Fragment>
      <div className="container mx-auto">
        <Header />
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Home />} />
            <Route path="Borsa" element={<Borsa />} />
            <Route path="Hakkımızda" element={<Hakkımızda />} />
            <Route path="İletişim" element={<İletisim />} />
            <Route path="Haberler" element={<Haberler />} />
          </Route>
          {/* public routes without sidebar */}
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/Auth" element={<NotRequireAuth />}>
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
          </Route>

          {/* Diğer routes */}
          <Route path="*" element={<NotFound />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Routes>
        <Footer />
      </div>
    </React.Fragment>
  );
};
