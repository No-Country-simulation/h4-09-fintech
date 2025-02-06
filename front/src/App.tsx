import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Login from "./views/auth/Login/Login";
import Register from "./views/auth/Register/Register";
import Onboarding from "./views/Onboarding/Onboarding";
import Error from "./views/Error/ErrorPage";
import { Dashboard } from "./views/Dashboard/Dashboard";
import Profile from "./views/Profile/Profile";
import EditProfile from "./views/EditProfile/EditProfile";
import Configurations from "./views/Configurations/Configurations";
import Auth from "./views/auth/Auth/Auth";
import Landing from "./views/Landing/Landing";
import Community from "./views/Community/Community";
import Create from "./views/Community/Create/Create";
import News from "./views/Community/News/News";
import Forum from "./views/Community/Forum/Forum";
import { Notificaciones } from "./views/Dashboard/notificaciones/Notificaciones";
import {
  ObjetivosNotif,
  Recordatorios,
  Todo,
} from "./views/Dashboard/notificaciones/pages/PagesNotif";
import ForumView from "./views/Community/Forum/[category]/ForumView";
import { AlertasInversion } from "./views/Dashboard/notificaciones/pages/AlertasInversion";
import { GestionInversiones } from "./views/Gestion de Inversiones/GestionInversiones";
import { FiltrosInversion } from "./views/Gestion de Inversiones/components/FiltrosInversion";
import { Todos } from "./views/Gestion de Inversiones/components/pages filtros/Todos";
import { NivelRiesgo } from "./views/Gestion de Inversiones/components/pages filtros/NivelRiesgo";
import { Categorias } from "./views/Gestion de Inversiones/components/pages filtros/Categorias";
import { HorizonteTemporal } from "./views/Gestion de Inversiones/components/pages filtros/HorizonteTemporal";
import { RendimientoHistorico } from "./views/Gestion de Inversiones/components/pages filtros/RendimientoHistorico";
import { Acciones } from "./views/Gestion de Inversiones/pages/Acciones";
import { MetalesPreciosos } from "./views/Gestion de Inversiones/pages/MetalesPreciosos";
import { Fondos } from "./views/Gestion de Inversiones/pages/Fondos";
import { ETFS } from "./views/Gestion de Inversiones/pages/ETFS";
import { Bonos } from "./views/Gestion de Inversiones/pages/Bonos";
import { DetalleEconomico } from "./views/Gestion de Inversiones/components/DetalleEconomico";
import { ObjetivosFinancieros } from "./views/Dashboard/objetivos financieros/ObjetivosFinancieros";
import CrearObjetivo from "./views/Dashboard/objetivos financieros/CrearObjetivo";
import PublicRoutes from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";
import { useUser } from "./contexts/UserContext";
import { SendEmail } from "./views/auth/Recovery/SendEmail";
import { RecoveryPassword } from "./views/auth/Recovery/RecoveryPassword";
// import Spinner from "./components/spiner/Spiner";

function App() {
  const {fetchUserData} = useUser();

  useEffect(() => {
    fetchUserData();
  },[])
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas previas a la app */}

      <Route element={<PublicRoutes/>}>
      <Route path="/" element={<Landing />} />
        <Route path="/auth/">
          <Route index element={<Auth />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="send-email" element={<SendEmail />} />
          <Route path="recovery-password" element={<RecoveryPassword/>} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        
      <Route path="/onboarding" element={<Onboarding />} />

{/* rutas anidadas dentro de "/auth"  */}

{/* Ruta del Navbar */}

<Route path="/dashboard" element={<Dashboard />} />
<Route path="/crear-objetivo" element={<CrearObjetivo />} />

<Route path="/gestion" element={<GestionInversiones />}>
  <Route path="acciones" element={<Acciones />} />
  <Route path="bonos" element={<Bonos />} />
  <Route path="etfs" element={<ETFS />} />
  <Route path="fondos" element={<Fondos />} />
  <Route path="metales-preciosos" element={<MetalesPreciosos />} />
</Route>
<Route
  path="/objetivos-financieros"
  element={<ObjetivosFinancieros />}
/>

{/* NOTIFICACIONES */}

<Route path="/notificaciones" element={<Notificaciones />}>
  <Route index element={<Navigate to="todo" />} />{" "}
  {/* Redirige a "/notificaciones/todo" */}
  <Route path="todo" element={<Todo />} />
  <Route path="objetivos-notif" element={<ObjetivosNotif />} />
  <Route path="recordatorios" element={<Recordatorios />} />
</Route>

{/* GESTION DE  INVERSIONES */}

<Route path="filtros-inversion" element={<FiltrosInversion />}>
  <Route index element={<Navigate to="categorias" />} />{" "}
  {/* Redirige al path de "categorias" */}
  <Route path="todos" element={<Todos />} />
  <Route path="nivel-riesgo" element={<NivelRiesgo />} />
  <Route path="categorias" element={<Categorias />} />{" "}
  {/* Ruta explícita para "categorias" */}
  <Route path="horizonte-temporal" element={<HorizonteTemporal />} />
  <Route
    path="rendimiento-historico"
    element={<RendimientoHistorico />}
  />
</Route>
<Route path="/detalle-economico" element={<DetalleEconomico />} />

<Route path="/alertas-inversion" element={<AlertasInversion />} />

{/* MI CUENTA */}
<Route path="/profile" element={<Profile />} />
<Route path="/editprofile" element={<EditProfile />} />
<Route path="/configurations" element={<Configurations />} />


{/* rutas anidadas para community */}
<Route path='/community/'>
  <Route index element={<Community />} />
  <Route path='create/:category' element={<Create />} />
  <Route path='news' element={<News />} />
  <Route path='forum' element={<Forum />} />
  <Route path='forum/:category' element={<ForumView />} />
</Route>
      </Route>


        {/* Ruta de error */}
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
