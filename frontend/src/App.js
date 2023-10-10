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
function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Home />} />
          <Route path="Borsa" element={<Borsa />} />
          <Route path="Hakkımızda" element={<Hakkımızda />} />
          <Route path="İletişim" element={<İletişim />} />
          <Route path="Haberler" element={<Haberler />} />
        </Route>
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/Auth">
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
