// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./views/Home/Home";
import Login from "./views/auth/Login/Login";
import Register from "./views/auth/Register/Register";
import Onboarding from "./views/Onboarding/Onboarding";
import Error from "./views/Error/ErrorPage";
import { Dashboard } from "./views/Dashboard/Dashboard";
import { Objetivos } from "./views/Dashboard/(components)/objetivos/Objetivos";
import { Objetivo } from "./views/Dashboard/(components)/objetivos/Objetivo";
import { Gestion } from "./views/Dashboard/(components)/gestion/Gestion";
import { Inversiones } from "./views/Dashboard/(components)/inversiones/Inversiones";
import { Cuenta } from "./views/Profile/Cuenta";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* rutas anidadas dentro de "/auth"  */}
        <Route path="/auth/">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/objetivos" element={<Objetivos />} />
        <Route path="/objetivo/:nombre" element={<Objetivo />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/inversiones" element={<Inversiones />} />
        <Route path="/cuenta" element={<Cuenta />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
