import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect } from "react";
import { setLoading, setToken, setUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";

import Loading from "./layout/Loading";

import React from "react";
import { AdminRoute } from "./Routes/AdminRoute";

import { HomeRoute } from "./Routes/HomeRoute";
function App() {
  const dispatch = useDispatch();

  const storedToken = localStorage.getItem("jwt");
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    if (storedToken) dispatch(setToken(storedToken));
    if (storedUser) dispatch(setUser(storedUser));
    dispatch(setLoading(false));
  }, [dispatch, storedToken, storedUser]);

  return (
    <Router>
      <Loading>
        <Routes>
          <Route path="/*" element={<HomeRoute />} />
          <Route path="/Admin/*" element={<AdminRoute />} />
        </Routes>
      </Loading>
    </Router>
  );
}

export default App;
