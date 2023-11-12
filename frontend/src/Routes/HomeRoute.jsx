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
import { Col, Container, Row } from "react-bootstrap";

export const HomeRoute = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col xs={9} className="bg-red-900">
          <Container>
            <Routes>
              {/* public routes */}
              <Route path="/">
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
          </Container>
        </Col>
        <Col xs={3}>
          <Container>
            <Sidebar />
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};
