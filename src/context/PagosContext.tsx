import { createContext, useState, ReactNode, useContext } from 'react';
import api from '../utils/axios';

export interface ResponseDepositos {
  depositoId: string;
  userId: string;
  name: string;
  lastName: string;
  email: string;
  monto: number;
  fechaDeposito: string;
  fechaEntrega: string;
  status: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  comprobante: string;
}

export interface ResponseRetiros {
  retiroId: string;
  userId: string;
  name: string;
  lastName: string;
  email: string;
  monto: number;
  fechaDeposito: string;
  fechaEntrega: string;
  cbu: string;
  status: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
}

export interface PagoLibProps {
  id: string;
  userId: string;
  name: string;
  lastName: string;
  dni: string;
  monto: number;
  fecha: string;
  status: 'pendiente' | 'aprobado' | 'rechazado';
  cbu: string;
}

interface PagosContextType {
  depositos: ResponseDepositos[];
  retiros: ResponseRetiros[];
  loading: boolean;
  fetchDepositos: () => Promise<void>;
  fetchRetiros: () => Promise<void>;
}

export interface HistorialPagosProps {
  id: string;
  userId: string;
  name: string;
  lastName: string;
  dni: string;
  monto: number;
  fecha: string;
  status: 'pendiente' | 'aprobado' | 'rechazado';
  tipo: 'retiro' | 'deposito';
}

interface PagosProviderProps {
  children: ReactNode;
}

const PagosContext = createContext<PagosContextType | undefined>(undefined);
export function usePagos() {
  const context = useContext(PagosContext);
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
}
export function PagoProvider({ children }: PagosProviderProps) {
  const [depositos, setDepositos] = useState<ResponseDepositos[]>([]);
  const [retiros, setRetiros] = useState<ResponseRetiros[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDepositos = async () => {
    setLoading(true);
    try {
      const { data } = await api<ResponseDepositos[]>('/api/admin/pagos/depositos');
      console.log(data);
      setDepositos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRetiros = async () => {
    try {
      const { data } = await api<ResponseRetiros[]>('/api/admin/pagos/retiros');
      setRetiros(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PagosContext.Provider value={{ depositos, retiros, loading, fetchDepositos, fetchRetiros }}>
      {children}
    </PagosContext.Provider>
  );
}
