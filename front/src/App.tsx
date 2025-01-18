import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
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
import Perfil from "./views/Perfil/Perfil";
import Auth from "./views/auth/Auth/Auth";
import Landing from "./views/Landing/Landing";
import {
  ArrowTrendingUpIcon,
  Squares2X2Icon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* rutas anidadas dentro de "/auth"  */}
        <Route path="/auth/">
          <Route index element={<Auth />} />
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
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
