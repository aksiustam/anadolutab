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
function App() {
  return (
    <Router>
      <div className="bg-green-800 w-full overflow-hidden">
        <div className={`sm:px-10 pl-6 flex justify-center items-center`}>
          <div className={`xl:max-w-[1280px] w-full`}>
            <Header />
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Home />} />
          <Route path="/Borsa" element={<Borsa />} />
          <Route path="/Hakkımızda" element={<Hakkımızda />} />
          <Route path="/İletişim" element={<İletişim />} />
          <Route path="/Haberler" element={<Haberler />} />
        </Route>
        <Route path="/product/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
