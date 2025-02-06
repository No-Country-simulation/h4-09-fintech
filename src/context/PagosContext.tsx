import { createContext, useState, ReactNode, useContext } from 'react';
import api from '../utils/axios';
import { AxiosError } from 'axios';

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

export interface RequestDepositosUpdate {
  message: string;
  deposito: ResponseDepositos;
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

export interface RequestRetirosUpdate {
  message: string;
  retiro: ResponseRetiros;
}

interface PagosContextType {
  depositos: ResponseDepositos[];
  retiros: ResponseRetiros[];
  loading: boolean;
  fetchDepositos: () => Promise<void>;
  fetchRetiros: () => Promise<void>;
  updateRetiro: (
    retiroId: string,
    status: 'APROBADO' | 'RECHAZADO',
    userId: string
  ) => Promise<void>;
  updateDeposito: (
    depositoId: string,
    status: 'APROBADO' | 'RECHAZADO',
    userId: string
  ) => Promise<void>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messageError: string;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
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
  const [message, setMessage] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');
  const fetchDepositos = async () => {
    setLoading(true);
    try {
      const { data } = await api<ResponseDepositos[]>('/api/admin/pagos/depositos');

      setDepositos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRetiros = async () => {
    try {
      setLoading(true);
      const { data } = await api<ResponseRetiros[]>('/api/admin/pagos/retiros');
      setRetiros(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateDeposito = async (
    depositoId: string,
    status: 'APROBADO' | 'RECHAZADO',
    userId: string
  ) => {
    try {
      setLoading(true);

      const { data } = await api.put<RequestDepositosUpdate>(`/api/admin/pagos/depositos`, {
        depositoId,
        status,
        userId,
      });
      setMessage(data.message);
      setDepositos((prevDepositos) =>
        prevDepositos.filter((deposito) => deposito.depositoId !== depositoId)
      );
      setDepositos((prevDepositos) => [...prevDepositos, data.deposito]);
    } catch (error) {
      setMessageError('Ocurrio un error al actualizar el deposito');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRetiro = async (
    retiroId: string,
    status: 'APROBADO' | 'RECHAZADO',
    userId: string
  ) => {
    try {
      setLoading(true);
      const { data } = await api.put<RequestRetirosUpdate>(`/api/admin/pagos/retiros`, {
        retiroId,
        status,
        userId,
      });
      setMessage(data.message);
      setRetiros((prevRetiros) => prevRetiros.filter((retiro) => retiro.retiroId !== retiroId));
      setRetiros((prevRetiros) => [...prevRetiros, data.retiro]);
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.status === 400) {
        console.log(error.response.data.details);
        setMessageError(error.response.data.details);
      }
      setMessageError('Ocurrio un error al actualizar el retiro');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PagosContext.Provider
      value={{
        depositos,
        retiros,
        loading,
        fetchDepositos,
        fetchRetiros,
        updateDeposito,
        updateRetiro,
        message,
        setMessage,
        messageError,
        setMessageError,
      }}
    >
      {children}
    </PagosContext.Provider>
  );
}
