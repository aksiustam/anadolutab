import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Main/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from "./pages/Detail";
import NotFound from "./pages/Main/NotFound";
import Borsa from "./pages/Main/Borsa";
import Hakkımızda from "./pages/Main/Hakkımızda";
import İletişim from "./pages/Main/İletişim";
import Sidebar from "./layout/Sidebar";
import Haberler from "./pages/Main/Haberler";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminHome from "./pages/Admin/AdminHome";
import Unauthorized from "./pages/Layout/Unauthorized";

import { useEffect } from "react";
import { refresh, setLoading } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import RequireAuth from "./utils/RequireAuth";
import Loading from "./layout/Loading";
import { useCookies } from "react-cookie";
function App() {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["jwt"]);
  useEffect(() => {
    if (cookies?.jwt) {
      dispatch(refresh());
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch, cookies.jwt]);

  return (
    <Router>
      <Loading>
        <Header />
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Home />} />
            <Route path="Borsa" element={<Borsa />} />
            <Route path="Hakkımızda" element={<Hakkımızda />} />
            <Route path="İletişim" element={<İletişim />} />
            <Route path="Haberler" element={<Haberler />} />
          </Route>
          {/* public routes without sidebar */}
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/Auth">
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
          </Route>
          {/* Admin routes */}
          <Route element={<RequireAuth allowedRoles={["user"]} />}>
            <Route path="Admin" element={<AdminHome />} />
          </Route>
          {/* Diğer routes */}
          <Route path="*" element={<NotFound />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Routes>
        <Footer />
      </Loading>
    </Router>
  );
}

export default App;
