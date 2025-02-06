import { createContext, useContext, useState } from 'react';
import api from '../utils/axios';
import { AxiosError } from 'axios';

export interface CuentaBancoResponse {
  id: string;
  cuit: string;
  cbu: string;
  alias: string;
  titular: string;
}
export interface updateCuentaBanco {
  cuit: string;
  cbu: string;
  alias: string;
  titular: string;
}

export interface CuentaBancoContextType {
  cuenta: CuentaBancoResponse | null;
  loading: boolean;
  fetchCuenta: () => Promise<void>;
  updateCuenta: (formData: updateCuentaBanco, id: string) => Promise<void>;
  cuentaMessage: string;
  setCuentaMessage: React.Dispatch<React.SetStateAction<string>>;
  cuentaMessageError: string;
  setCuentaMessageError: React.Dispatch<React.SetStateAction<string>>;
}

const CuentasBancoContext = createContext<CuentaBancoContextType | undefined>(undefined);
export function useCuentaBanco() {
  const context = useContext(CuentasBancoContext);
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
}

export function CuentaBancoProvider({ children }: { children: React.ReactNode }) {
  const [cuenta, setCuentas] = useState<CuentaBancoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cuentaMessage, setCuentaMessage] = useState<string>('');
  const [cuentaMessageError, setCuentaMessageError] = useState<string>('');

  const fetchCuenta = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<CuentaBancoResponse>('/api/cuenta-banco');
      setCuentas(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCuenta = async (formData: updateCuentaBanco, id: string) => {
    try {
      setLoading(true);
      const { data } = await api.put(`/api/admin/cuenta-banco/${id}`, formData);
      setCuentaMessage('Cuenta actualizada exitosamente!');
      setCuentas(data);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.details);
        setCuentaMessageError(error.response.data.details);
      }
      setCuentaMessageError('Ocurrio un error al actualizar la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CuentasBancoContext.Provider
      value={{
        cuenta,
        loading,
        fetchCuenta,
        cuentaMessage,
        setCuentaMessage,
        cuentaMessageError,
        setCuentaMessageError,
        updateCuenta,
      }}
    >
      {children}
    </CuentasBancoContext.Provider>
  );
}
