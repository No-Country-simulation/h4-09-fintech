import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Login from './views/auth/Login/Login'
import Register from './views/auth/Register/Register'
import Onboarding from './views/Onboarding/Onboarding'
import Error from './views/Error/ErrorPage'
import { Dashboard } from "./views/Dashboard/Dashboard";
import { Objetivos } from "./views/Dashboard/(components)/objetivos/Objetivos";
import { Objetivo } from "./views/Dashboard/(components)/objetivos/Objetivo";
import { Gestion } from "./views/Dashboard/(components)/gestion/Gestion";
import { Inversiones } from "./views/Dashboard/(components)/inversiones/Inversiones";
import Profile from "./views/Profile/Profile";
import EditProfile from "./views/EditProfile/EditProfile";
import Configurations from "./views/Configurations/Configurations";
import Auth from './views/auth/Auth/Auth'
import Landing from './views/Landing/Landing'
import Community from './views/Community/Community'
import Create from './views/Community/Create/Create'
import News from './views/Community/News/News'
import Forum from './views/Community/Forum/Forum'
import { Notificaciones } from "./views/Dashboard/notificaciones/Notificaciones";
import {
  ObjetivosNotif,
  Recordatorios,
  Todo,
} from "./views/Dashboard/notificaciones/pages/PagesNotif";
        
function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Landing />} />
				{/* rutas anidadas dentro de "/auth"  */}
				<Route path='/auth/'>
					<Route index element={<Auth />} />
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
				</Route>
        
				<Route path='/onboarding' element={<Onboarding />} />
         <Route path="/dashboard" element={<Dashboard />} />
        
                {/* Ruta Notificaciones con subrutas */}
        <Route path="/notificaciones" element={<Notificaciones />}>
          <Route path="todo" element={<Todo />} />
          <Route path="objetivos-notif" element={<ObjetivosNotif />} />
          <Route path="recordatorios" element={<Recordatorios />} />
        </Route>
         <Route path="/objetivos" element={<Objetivos />} />
        <Route path="/objetivo/:nombre" element={<Objetivo />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/inversiones" element={<Inversiones />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/configurations" element={<Configurations />} />
        
				<Route path='/perfil' element={<Perfil />} />
				<Route path='/community/'>
					<Route index element={<Community />} />
					<Route path='create' element={<Create />} />
					<Route path='news' element={<News />} />
					<Route path='forum' element={<Forum />} />
				</Route>
				<Route path='/*' element={<Error />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App;
