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
import PostView from "./views/Community/Forum/[id]/PostView";
import { AlertasInversion } from "./views/Dashboard/notificaciones/pages/AlertasInversion";
import { GestionInversiones } from "./views/Gestion de Inversiones/GestionInversiones";
import { FiltrosInversion } from "./views/Gestion de Inversiones/components/FiltrosInversion";
import { Todos } from "./views/Gestion de Inversiones/components/pages filtros/Todos";
import { NivelRiesgo } from "./views/Gestion de Inversiones/components/pages filtros/NivelRiesgo";
import { Categorias } from "./views/Gestion de Inversiones/components/pages filtros/Categorias";
import { HorizonteTemporal } from "./views/Gestion de Inversiones/components/pages filtros/HorizonteTemporal";
import { RendimientoHistorico } from "./views/Gestion de Inversiones/components/pages filtros/RendimientoHistorico";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas previas a la app */}

        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* rutas anidadas dentro de "/auth"  */}

        <Route path="/auth/">
          <Route index element={<Auth />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* Ruta del Navbar */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gestion" element={<GestionInversiones />} />

        {/* NOTIFICACIONES */}

        <Route path="/notificaciones" element={<Notificaciones />}>
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
        <Route path="/alertas-inversion" element={<AlertasInversion />} />

        {/* MI CUENTA */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/configurations" element={<Configurations />} />

        {/* COMMUNITY */}
        <Route path="/community">
          <Route index element={<Community />} />
          <Route path="create" element={<Create />} />
          <Route path="news" element={<News />} />
          <Route path="forum" element={<Forum />} />
          <Route path="forum/:id" element={<PostView />} />
        </Route>

        {/* Ruta de error */}
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
