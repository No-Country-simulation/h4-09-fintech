import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import PublicRoutes from './PublicRoute';
import Dashboard from './views/dashboard/Dashboard';
import Login from './views/login/Login';

import AprobarPagos from './views/dashboard/aprobar-pagos/AprobarPagos';
import LiberarPagos from './views/dashboard/liberar-pagos/LiberarPagos';
import HistorialPagos from './views/dashboard/historial-pagos/HistorialPagos';

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/aprobar-pagos" element={<AprobarPagos />} />
          <Route path="/dashboard/liberar-pagos" element={<LiberarPagos />} />
          <Route path="/dashboard/historial-pagos" element={<HistorialPagos />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<>404</>} />
      </Routes>
    </>
  );
};

export default Router;
