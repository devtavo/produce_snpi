import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { UserContext } from "./context/UserContext";


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
