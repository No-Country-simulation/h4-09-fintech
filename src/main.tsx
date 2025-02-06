import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import { PagoProvider } from './context/PagosContext.tsx';
import { CuentaBancoProvider } from './context/CuentaBancoContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PagoProvider>
          <CuentaBancoProvider>
            <App />
          </CuentaBancoProvider>
        </PagoProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
